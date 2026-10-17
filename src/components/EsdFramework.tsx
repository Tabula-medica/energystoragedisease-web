import { Lock, Shuffle, BarChart3, Zap } from 'lucide-react'

const pillars = [
  {
    icon: Lock,
    color: 'text-blue-500',
    bg: 'bg-blue-50',
    number: '01',
    title: 'Cellular Energy Lock',
    subtitle: 'Insulin Resistance',
    description:
      'Insulin is the key that unlocks cells to absorb glucose. In ESD, the locks become resistant — cells can\'t access energy even when fuel is abundant. Blood sugar rises as a consequence, not a cause.',
    implication:
      'Implication: Lowering blood sugar without restoring insulin sensitivity leaves cells starved while glucose builds up in the blood.',
    research: 'Reaven 1988; DeFronzo 2009',
  },
  {
    icon: Shuffle,
    color: 'text-purple-500',
    bg: 'bg-purple-50',
    number: '02',
    title: 'Metabolic Inflexibility',
    subtitle: 'Fuel-Switching Failure',
    description:
      'A healthy metabolism switches seamlessly between burning glucose and fat — called metabolic flexibility. ESD locks the body into glucose-dependent mode. When glucose dips, the body can\'t shift to fat burning, driving hunger, fatigue, and fat accumulation.',
    implication:
      'Implication: Restoring metabolic flexibility — through diet, fasting, or exercise — treats ESD at the root. Medication alone cannot.',
    research: 'Kelley & Mandarino 2000; Goodpaster 2017',
  },
  {
    icon: BarChart3,
    color: 'text-amber-500',
    bg: 'bg-amber-50',
    number: '03',
    title: 'Chronic Energy Surplus',
    subtitle: 'Storage Overload Cascade',
    description:
      'The body has a hierarchy of energy storage: glycogen first, then subcutaneous fat, then visceral fat, then ectopic (liver, pancreas, muscle). ESD develops when persistent surplus overflows each tier, eventually impairing the very organs that regulate fuel.',
    implication:
      'Implication: Caloric reduction and time-restricted eating directly decompress storage — often achieving remission without drugs.',
    research: 'Taylor 2019 (Twin Cycle); Lim 2011',
  },
  {
    icon: Zap,
    color: 'text-teal-500',
    bg: 'bg-teal-50',
    number: '04',
    title: 'Mitochondrial Dysfunction',
    subtitle: 'Cellular Power Plant Failure',
    description:
      'Mitochondria are the power plants that convert fuel into energy (ATP). In ESD, chronic overload and inflammation damage mitochondria — reducing quantity, impairing quality, and creating oxidative stress. Even when fuel is available, cells can\'t burn it efficiently.',
    implication:
      'Implication: Exercise is the most powerful mitochondrial intervention. It builds new mitochondria and reverses the cellular energy deficit.',
    research: 'Mootha 2003; Lowell & Shulman 2005',
  },
]

export default function EsdFramework() {
  return (
    <section id="framework" className="bg-white py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-teal-500/10 text-teal-600 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            The ESD Framework
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-navy-900 text-balance">
            Four Pillars of Energy Storage Disease
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-navy-700/70">
            ESD is not one mechanism — it's a cascade. Each pillar reinforces the others.
            Understanding all four is essential for effective treatment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon
            return (
              <div
                key={pillar.number}
                className="group relative bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-md hover:border-teal-200 transition-all"
              >
                <div className="absolute top-6 right-6 text-5xl font-black text-gray-50 group-hover:text-teal-50 transition-colors select-none">
                  {pillar.number}
                </div>

                <div className={`w-12 h-12 ${pillar.bg} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon size={22} className={pillar.color} />
                </div>

                <div className="text-xs text-navy-700/50 font-semibold uppercase tracking-wider mb-1">
                  {pillar.subtitle}
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-3">{pillar.title}</h3>
                <p className="text-navy-700/70 text-sm leading-relaxed mb-4">{pillar.description}</p>

                <div className="bg-navy-900/3 border-l-2 border-teal-500 pl-3 py-2 rounded-r text-sm text-navy-700/80 italic mb-3">
                  {pillar.implication}
                </div>

                <div className="text-xs text-navy-700/40">
                  Research basis: {pillar.research}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-12 bg-navy-900 rounded-2xl p-8 text-center">
          <p className="text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
            These four mechanisms are <strong className="text-white">interdependent</strong>. Cellular energy lock
            worsens metabolic inflexibility. Surplus overload drives mitochondrial dysfunction.
            Treating only one pillar — or treating the blood sugar symptom — leaves the disease intact.
          </p>
        </div>
      </div>
    </section>
  )
}
