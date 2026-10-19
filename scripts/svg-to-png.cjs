/**
 * Convert og-image.svg → og-image.png using sharp (or canvas fallback)
 * Run: node scripts/svg-to-png.cjs
 */
const fs = require('fs'), path = require('path');

const SVG = path.join(__dirname, '../public/og-image.svg');
const PNG = path.join(__dirname, '../public/og-image.png');

// Try sharp first (fast, native SVG→PNG)
async function trySharp() {
  const sharp = require('sharp');
  const buf = fs.readFileSync(SVG);
  await sharp(buf).resize(1200, 630).png().toFile(PNG);
  console.log('✓ og-image.png written via sharp (1200×630)');
}

// Fallback: write a programmatic PNG using pure canvas-like approach
async function fallback() {
  console.log('sharp not found — using canvas fallback');
  const { createCanvas } = require('@napi-rs/canvas');
  const W = 1200, H = 630;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');

  // Background gradient (dark teal → dark navy)
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, '#0A1628');
  grad.addColorStop(1, '#0D2236');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Teal accent strip on left
  ctx.fillStyle = '#14B8A6';
  ctx.fillRect(0, 0, 8, H);

  // Title
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 72px sans-serif';
  ctx.fillText('Energy Storage Disease', 80, 220);

  // Subtitle
  ctx.fillStyle = '#14B8A6';
  ctx.font = 'bold 36px sans-serif';
  ctx.fillText('The Root-Cause Reframe of Type 2 Diabetes', 80, 290);

  // Tagline
  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  ctx.font = '28px sans-serif';
  ctx.fillText('Understand & reverse the real disease — 10–15 years earlier', 80, 360);

  // Bottom domain
  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  ctx.font = '22px sans-serif';
  ctx.fillText('energystoragedisease.com', 80, 570);

  const buf = canvas.toBuffer('image/png');
  fs.writeFileSync(PNG, buf);
  console.log('✓ og-image.png written via canvas fallback (1200×630)');
}

trySharp().catch(() => fallback().catch(e => {
  console.error('Both sharp and @napi-rs/canvas failed:', e.message);
  console.log('\nInstall sharp: npm install sharp  then re-run');
  process.exit(1);
}));
