import { ExternalLink, BookOpen } from 'lucide-react'

const studies = [
  {
    tag: 'Landmark RCT',
    tagColor: 'bg-teal-500/20 text-teal-400',
    title: 'DiRECT Trial',
    authors: 'Taylor et al. (2018)',
    journal: 'The Lancet',
    finding: '46% of participants achieved remission of Type 2 Diabetes at 12 months through low-calorie dietary intervention — without medication.',
    esdReframe: 'When energy surplus is eliminated, the storage cascade reverses. The pancreas recovers. ESD is not permanent.',
    doi: 'https://doi.org/10.1016/S0140-6736(17)33102-1',
  },
  {
    tag: 'Clinical Trial',
    tagColor: 'bg-amber-500/20 text-amber-400',
    title: 'Virta Health Study',
    authors: 'Hallberg et al. (2019)',
    journal: 'Frontiers in Endocrinology',
    finding: '60% reversal rate at 2 years using continuous ketogenic nutritional intervention, vs 6% in usual care.',
    esdReframe: 'Switching fuel substrate from glucose to ketones bypasses the insulin resistance bottleneck — directly treating ESD Pillar 2 (metabolic inflexibility).',
    doi: 'https://doi.org/10.3389/fendo.2019.00348',
  },
  {
    tag: 'Foundational Science',
    tagColor: 'bg-blue-500/20 text-blue-400',
    title: 'HOMA-IR Validation',
    authors: 'Matthews DR et al. (1985)',
    journal: 'Diabetologia',
    finding: 'Validated the homeostatic model for measuring insulin resistance and beta-cell function from fasting glucose and insulin alone.',
    esdReframe: 'HOMA-IR is the clinical fingerprint of Energy Storage Disease — detectable years before fasting glucose becomes abnormal.',
    doi: 'https://doi.org/10.1007/BF00280883',
  },
  {
    tag: 'Mechanism',
    tagColor: 'bg-purple-500/20 text-purple-400',
    title: "Reaven's Syndrome X",
    authors: 'Reaven GM (1988)',
    journal: 'Diabetes',
    finding: "Described the clustering of insulin resistance with hypertension, dyslipidemia, and cardiovascular risk — decades before 'metabolic syndrome' became standard terminology.",
    esdReframe: 'Reaven identified what ESD explains: insulin resistance is the root node, not one of many co-equal risk factors.',
    doi: 'https://doi.org/10.2337/diab.37.12.1595',
  },
  {
    tag: 'Mechanism',
    tagColor: 'bg-rose-500/20 text-rose-400',
    title: 'Mitochondrial Dysfunction in T2D',
    authors: 'Lowell & Shulman (2005)',
    journal: 'Science',
    finding: 'Demonstrated that mitochondrial dysfunction in skeletal muscle drives lipid accumulation and insulin resistance — establishing the ESD Pillar 4 link.',
    esdReframe: 'The energy storage problem is partly a mitochondrial problem: cells that cannot burn fat efficiently store it instead.',
    doi: 'https://doi.org/10.1126/science.1104343',
  },
  {
    tag: 'Population Study',
    tagColor: 'bg-green-500/20 text-green-400',
    title: 'Metabolic Inflexibility Paradigm',
    authors: 'Kelley & Mandarino (2000)',
    journal: 'Diabetes',
    finding: 'Defined metabolic inflexibility as the inability to switch between glucose and fat oxidation — the failure mode that characterizes ESD in skeletal muscle.',
    esdReframe: 'When you cannot switch fuels, you are metabolically inflexible. This is ESD Pillar 2 — and it is measurable and reversible.',
    doi: 'https://doi.org/10.2337/diabetes.49.5.677',
  },
]

export default function ResearchEvidence() {
  return (
    <section id="research" className="bg-white py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-navy-900/5 text-navy-800 text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <BookOpen size={14} />
            Peer-Reviewed Evidence
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-navy-900 text-balance mb-4">
            The Science Behind ESD
          </h2>
          <p className="text-navy-600/70 text-lg leading-relaxed max-w-2xl mx-auto">
            Energy Storage Disease is not a rebrand — it is the logical synthesis of decades of
            metabolic research. These studies form the evidentiary foundation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studies.map((s) => (
            <div
              key={s.title}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="flex items-start justify-between gap-2 mb-4">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${s.tagColor}`}>
                  {s.tag}
                </span>
                <a
                  href={s.doi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-teal-500 transition-colors shrink-0"
                  aria-label="View study"
                >
                  <ExternalLink size={14} />
                </a>
              </div>

              <h3 className="text-navy-900 font-bold text-lg mb-1">{s.title}</h3>
              <p className="text-gray-400 text-xs mb-3">{s.authors} · {s.journal}</p>

              <p className="text-navy-700 text-sm leading-relaxed mb-4 flex-1">{s.finding}</p>

              <div className="border-t border-teal-100 pt-4">
                <p className="text-teal-700 text-xs leading-relaxed font-medium">
                  ESD lens: {s.esdReframe}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-400 text-xs mt-10">
          Citations are for educational purposes. ESD is not a clinical diagnosis; it is an
          educational reframing of ICD-10 E11 (Type 2 Diabetes Mellitus).
        </p>
      </div>
    </section>
  )
}
