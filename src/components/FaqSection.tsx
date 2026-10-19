import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const FAQS = [
  {
    q: 'What is Energy Storage Disease?',
    a: 'Energy Storage Disease (ESD) is the root-cause name for what medicine calls Type 2 Diabetes. "Diabetes mellitus" describes a symptom — glucose overflowing into urine. ESD names the underlying mechanism: a cascade of insulin resistance, metabolic inflexibility, chronic energy surplus, and mitochondrial dysfunction that begins 10–15 years before a diabetes diagnosis.',
  },
  {
    q: 'What is HOMA-IR and why does it matter?',
    a: 'HOMA-IR (Homeostatic Model Assessment of Insulin Resistance) is calculated from two fasting blood values: (fasting glucose × fasting insulin) ÷ 405. A score below 1.0 is optimal; below 2.0 is acceptable. Scores of 2.0–3.0 indicate early insulin resistance, 3.0–5.0 significant resistance, and above 5.0 advanced ESD. Unlike HbA1c, HOMA-IR can detect metabolic dysfunction 10–15 years before a diabetes diagnosis — while there is still ample opportunity to reverse the root disease.',
  },
  {
    q: 'Can Type 2 Diabetes really be reversed?',
    a: 'Yes — peer-reviewed evidence shows remission is achievable. The DiRECT trial (Lancet, 2018) showed 46% remission at 12 months with dietary intervention. Virta Health\'s 2-year data showed 60% remission through nutritional ketosis. Roy Taylor\'s Twin Cycle research showed liver fat can clear in 8 weeks. Remission is defined as HbA1c below 6.5% without medication.',
  },
  {
    q: 'What labs should I ask my doctor to order?',
    a: 'The 6 key ESD markers: (1) fasting insulin — most important, rarely ordered spontaneously; (2) HOMA-IR — calculated from fasting insulin + glucose; (3) TG:HDL ratio — a metabolic health proxy; (4) fasting glucose; (5) HbA1c; (6) uric acid — elevated in metabolic syndrome. Ask for a "fasting insulin level" specifically — it is not included in standard metabolic panels.',
  },
  {
    q: 'Is this app a substitute for medical care?',
    a: 'No. The app is for educational and informational purposes only. HOMA-IR scores and lab interpretations are general guidance, not personalized medical advice. Always work with a qualified healthcare provider before making any changes to your diet, medications, or treatment plan.',
  },
  {
    q: 'How does the app protect my privacy?',
    a: 'The app requires no account and collects no personal data. Your HOMA-IR history is stored only in encrypted on-device storage (iOS Keychain / Android EncryptedSharedPreferences). The only network request the app makes is loading educational content from energystoragedisease.com — no data is ever sent from your device.',
  },
]

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="py-20 bg-slate-900/50">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">Frequently Asked Questions</h2>
          <p className="text-white/50">Common questions about ESD, HOMA-IR, and the app.</p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/8 rounded-xl overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-white font-medium leading-snug">{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`text-teal-400 flex-shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
                />
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-white/60 text-sm leading-relaxed border-t border-white/5 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-white/30 text-sm">
            More questions?{' '}
            <a
              href="mailto:rajivka4@gmail.com"
              className="text-teal-400 hover:text-teal-300 transition-colors"
            >
              Email us
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
