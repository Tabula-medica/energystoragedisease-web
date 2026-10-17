import { User, Stethoscope, BookOpen } from 'lucide-react'

const audiences = [
  {
    icon: User,
    id: 'patients',
    label: 'For Patients',
    headline: 'Your diagnosis is a starting point, not a life sentence.',
    points: [
      'Understand why you developed ESD — genetics are a small part of the story',
      'Learn which interventions address root cause vs. just managing symptoms',
      'Discover why remission is achievable and what it takes to get there',
      'Find providers who practice metabolic medicine, not just glucose management',
      'Get tools to track the metabolic markers that actually matter: HOMA-IR, fasting insulin, triglycerides/HDL',
    ],
    cta: 'Join Waitlist — Patient Track',
  },
  {
    icon: Stethoscope,
    id: 'providers',
    label: 'For Providers',
    headline: 'Reframe the conversation. Transform outcomes.',
    points: [
      'Clinical ESD framework with evidence base for patient counseling',
      'Metabolic biomarker panel recommendations beyond A1C',
      'Dietary and lifestyle prescription protocols grounded in ESD science',
      'Scripts for reframing "chronic disease management" as "remission potential"',
      'CME-ready resources on insulin resistance, metabolic flexibility, and mitochondrial health',
    ],
    cta: 'Join Waitlist — Provider Track',
  },
  {
    icon: BookOpen,
    id: 'researchers',
    label: 'For Researchers & Media',
    headline: 'The ESD nomenclature movement needs champions.',
    points: [
      'Peer-reviewed evidence brief on ESD vs. conventional diabetes nomenclature',
      'Media kit: ESD framework explained for general audiences',
      'Research collaboration opportunities in metabolic medicine',
      'Conference and CME speaking resources',
      'Policy paper: why ICD nomenclature should reflect root cause',
    ],
    cta: 'Join Waitlist — Research Track',
  },
]

export default function ForWhom() {
  return (
    <section id="providers" className="bg-white py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-teal-500/10 text-teal-600 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            Who This Is For
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-navy-900 text-balance">
            Reframing Changes Everything
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-navy-700/70">
            The ESD platform is being built for patients, providers, and the broader community that
            shapes how metabolic disease is understood and treated.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {audiences.map((aud) => {
            const Icon = aud.icon
            return (
              <div
                key={aud.id}
                className="flex flex-col bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-md hover:border-teal-200 transition-all"
              >
                <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mb-4">
                  <Icon size={22} className="text-teal-600" />
                </div>
                <div className="text-xs text-teal-600 font-semibold uppercase tracking-wider mb-2">
                  {aud.label}
                </div>
                <h3 className="text-lg font-bold text-navy-900 mb-4">{aud.headline}</h3>
                <ul className="space-y-2.5 flex-1 mb-6">
                  {aud.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-navy-700/70">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
                <a
                  href="#waitlist"
                  className="block text-center bg-navy-900 hover:bg-teal-600 text-white text-sm font-semibold px-4 py-3 rounded-xl transition-colors"
                >
                  {aud.cta}
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
