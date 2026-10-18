import { TrendingDown, Clock, Award } from 'lucide-react'

const stats = [
  {
    number: '46%',
    label: 'Remission at 12 months',
    source: 'DiRECT Trial, Lancet 2018',
    context: 'Type 2 Diabetes reversed through low-calorie dietary intervention alone, without medication',
  },
  {
    number: '60%',
    label: 'Reversal at 2 years',
    source: 'Virta Health, Front. Endocrinol. 2019',
    context: 'Continuous ketogenic nutritional intervention vs. 6% in standard care group',
  },
  {
    number: '8 weeks',
    label: 'Liver fat clears',
    source: "Taylor's Twin Cycle Hypothesis, 2019",
    context: 'With sustained caloric deficit, ectopic liver fat clears within 8 weeks, beginning cascade reversal',
  },
]

const mechanisms = [
  {
    icon: TrendingDown,
    title: 'Energy Surplus Removal',
    description:
      'When caloric load drops below energy expenditure, ectopic fat deposits in the liver and pancreas begin to clear within weeks. Insulin demand falls. Insulin resistance starts resolving.',
    evidence: 'DiRECT trial: significant liver fat reduction at 5 months correlated directly with A1c improvement',
  },
  {
    icon: Clock,
    title: 'Time-Restricted Eating',
    description:
      "Limiting eating to 6–10 hour windows reduces total insulin exposure, shifts fuel metabolism back toward fat oxidation, and allows cellular insulin receptors to 'reset' sensitivity.",
    evidence: 'Sutton et al. 2018: Early TRE improved insulin sensitivity independent of weight loss',
  },
  {
    icon: Award,
    title: 'Exercise-Induced Mitochondrial Recovery',
    description:
      'Resistance and aerobic exercise are the only proven interventions that build new mitochondria. Mitochondrial biogenesis via PGC-1α directly reverses ESD Pillar 4.',
    evidence: 'Mootha et al. 2003: exercise restores mitochondrial gene expression in T2D skeletal muscle',
  },
]

export default function ReversalEvidence() {
  return (
    <section id="reversal" className="bg-white py-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-teal-500/10 text-teal-600 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            Reversal Is Real
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-navy-900 text-balance mb-4">
            ESD Is Reversible
          </h2>
          <p className="text-navy-700/60 text-lg leading-relaxed max-w-2xl mx-auto">
            This is the most important thing the conventional "diabetes is chronic and progressive"
            framing gets wrong. Clinical trials prove remission is achievable — not rare, not luck.
          </p>
        </div>

        {/* Stats row */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {stats.map((s) => (
            <div
              key={s.number}
              className="bg-navy-900 rounded-2xl p-8 text-center"
            >
              <div className="text-5xl font-black text-teal-400 mb-2">{s.number}</div>
              <div className="text-white font-bold text-lg mb-2">{s.label}</div>
              <div className="text-teal-400/60 text-xs font-semibold mb-3">{s.source}</div>
              <p className="text-white/40 text-sm leading-relaxed">{s.context}</p>
            </div>
          ))}
        </div>

        {/* Mechanism cards */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-navy-900 text-center mb-8">
            How Reversal Works
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {mechanisms.map((m) => {
              const Icon = m.icon
              return (
                <div
                  key={m.title}
                  className="border border-gray-100 rounded-2xl p-6 hover:border-teal-200 hover:shadow-sm transition-all"
                >
                  <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center mb-4">
                    <Icon size={18} className="text-teal-600" />
                  </div>
                  <h4 className="text-navy-900 font-bold mb-2">{m.title}</h4>
                  <p className="text-navy-700/60 text-sm leading-relaxed mb-4">{m.description}</p>
                  <div className="bg-teal-50 rounded-lg p-3">
                    <p className="text-teal-700 text-xs leading-relaxed">{m.evidence}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Pull quote */}
        <div className="bg-navy-900 rounded-2xl p-8 md:p-12 text-center">
          <blockquote className="text-xl md:text-2xl font-bold text-white leading-relaxed mb-4 text-balance">
            "Type 2 diabetes is a potentially reversible metabolic state precipitated by the excess
            deposition of fat within the liver and pancreas."
          </blockquote>
          <cite className="text-white/40 text-sm not-italic">
            — Prof. Roy Taylor, Newcastle University, architect of the DiRECT trial
          </cite>
        </div>
      </div>
    </section>
  )
}
