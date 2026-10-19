#!/usr/bin/env node
/**
 * Pull PCPs + Endocrinologists with fax from NPPES
 * and export a CSV suitable for RingCentral fax or Mailgun.
 *
 * Usage:
 *   node scripts/nppes-esd-targets.mjs [--state VA] [--limit 1000] [--out providers.csv]
 *
 * No API key needed — NPPES is public.
 */
import { writeFileSync } from 'fs';

const NPPES = 'https://npiregistry.cms.hhs.gov/api/?version=2.1';

// NPPES taxonomy_description expects text descriptions, not codes
const TAXONOMIES = [
  'Family Medicine',
  'Internal Medicine',
  'Endocrinology, Diabetes & Metabolism',
  'General Practice',
  'Adult Medicine',
];

const args = process.argv.slice(2);
const getArg = (flag, def) => {
  const i = args.indexOf(flag);
  return i >= 0 ? args[i + 1] : def;
};

const STATE      = getArg('--state', 'VA');
const LIMIT      = parseInt(getArg('--limit', '2000'), 10);
const MAX_SKIP   = parseInt(getArg('--max-skip', '5000'), 10); // cap per-taxonomy depth
const OUTFILE    = getArg('--out', `esd-providers-${STATE.toLowerCase()}.csv`);

async function fetchPage(taxonomy, skip = 0) {
  const url = `${NPPES}&taxonomy_description=${encodeURIComponent(taxonomy)}&state=${STATE}&limit=200&skip=${skip}&enumeration_type=NPI-1`;
  const r = await fetch(url);
  if (r.status === 403) {
    console.log(`\n  NPPES rate-limited at skip=${skip} for ${taxonomy} — stopping this taxonomy`);
    return null; // signal to stop, don't throw
  }
  if (!r.ok) throw new Error(`NPPES ${r.status} for ${taxonomy} skip=${skip}`);
  const json = await r.json();
  return json.results ?? [];
}

function extractFax(provider) {
  const addresses = provider.addresses ?? [];
  for (const a of addresses) {
    if (a.fax_number) return a.fax_number.replace(/\D/g, '');
  }
  return '';
}

function extractPhone(provider) {
  const addresses = provider.addresses ?? [];
  for (const a of addresses) {
    if (a.telephone_number) return a.telephone_number.replace(/\D/g, '');
  }
  return '';
}

function extractCity(provider) {
  return provider.addresses?.[0]?.city ?? '';
}
function extractZip(provider) {
  return provider.addresses?.[0]?.postal_code?.slice(0,5) ?? '';
}
function extractSpecialty(provider) {
  return provider.taxonomies?.find(t => t.primary)?.desc ?? '';
}

const seen = new Set();
const rows = [];

console.log(`Querying NPPES for ${STATE} providers...`);

for (const taxonomy of TAXONOMIES) {
  let skip = 0;
  let fetched;
  do {
    fetched = await fetchPage(taxonomy, skip);
    if (fetched === null) break; // rate-limited — move to next taxonomy
    for (const p of fetched) {
      const npi = p.number;
      if (seen.has(npi)) continue;
      seen.add(npi);

      const fax = extractFax(p);
      if (!fax) continue;

      const basic = p.basic ?? {};
      rows.push({
        npi,
        first_name:   basic.first_name ?? '',
        last_name:    basic.last_name ?? '',
        credential:   basic.credential ?? '',
        specialty:    extractSpecialty(p),
        city:         extractCity(p),
        zip:          extractZip(p),
        phone:        extractPhone(p),
        fax,
      });
    }
    skip += 200;
    process.stdout.write(`\r  ${taxonomy}: ${rows.length} w/ fax so far...`);
  } while (fetched.length === 200 && rows.length < LIMIT && skip <= MAX_SKIP);
}

console.log(`\nTotal providers with fax: ${rows.length}`);

// Write CSV
const header = 'npi,first_name,last_name,credential,specialty,city,zip,phone,fax';
const lines = rows.map(r =>
  [r.npi, r.first_name, r.last_name, r.credential, r.specialty, r.city, r.zip, r.phone, r.fax]
    .map(v => `"${String(v).replace(/"/g, '""')}"`)
    .join(',')
);
writeFileSync(OUTFILE, [header, ...lines].join('\n'), 'utf8');
console.log(`Saved: ${OUTFILE}`);
console.log('');
console.log('Next steps:');
console.log('  1. Review providers.csv — remove any you know opted out');
console.log('  2. Load into RingCentral fax campaign (bulk fax)');
console.log('  3. Or import into Mailgun for email broadcast');
console.log('  ⚠️  Confirm opt-out list + Trevor JFPA review before mass send');
