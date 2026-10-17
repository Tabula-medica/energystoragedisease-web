import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const myths = [
  {
    myth: 'Diabetes is caused by eating too much sugar.',
    truth: 'Sugar is a trigger, not the sole cause. ESD develops from chronic caloric surplus, lack of physical activity, sleep deprivation, chronic stress, and environmental toxins — all of which impair cellular energy metabolism. Many people with T2D rarely consume excess sugar.',
    citation: 'Hu 2001; Bhupathiraju 2013',
  },
  {
    myth: "Once you have diabetes, it's a lifelong chronic disease.",
    truth: 'ESD can achieve full remission. The DiRECT trial showed 46% remission at 1 year with intensive dietary intervention. The Twin Cycle Hypothesis demonstrates that removing ectopic fat from the liver and pancreas restores normal function.',
    citation: 'Lean 2018 (DiRECT); Taylor 2019',
  },
  {
    myth: "If your A1C is controlled, you're managing your diabetes well.",
    truth: 'A1C measures average glucose — not insulin resistance, metabolic flexibility, mitochondrial health, or ectopic fat. You can have a "controlled" A1C while the underlying ESD is worsening. Comprehensive metabolic panels (fasting insulin, HOMA-IR, triglyceride/HDL ratio) reveal the real picture.',
    citation: 'Abdul-Ghani 2011; Bergman 2005',
  },
  {
    myth: 'Diabetes medications fix the problem.',
    truth: 'Most diabetes medications treat the symptom (high glucose) without addressing the cause. Metformin reduces hepatic glucose output; sulfonylureas force the pancreas to produce more insulin; GLP-1 agonists suppress appetite. None directly restore mitochondrial function or metabolic flexibility — though GLP-1s show significant metabolic benefits beyond glucose control.',
    citation: 'Turner 1999; Diabetes Prevention Program 2002',
  },
  {
    myth: 'People with diabetes just need to eat less and exercise more.',
    truth: 'This oversimplification ignores the neurohormonal drivers of ESD. Leptin resistance, reward-pathway dysregulation, circadian disruption, and gut microbiome dysfunction all contribute. Effective treatment requires addressing the full metabolic picture, not moralizing about willpower.',
    citation: 'Hall 2022; Schwartz 2017',
  },
  {
    myth: 'Low-fat diets are the best treatment for diabetes.',
    truth: 'Decades of low-fat dietary advice have coincided with the global diabetes epidemic. Low-carbohydrate and ketogenic diets have the strongest evidence for improving insulin sensitivity, reducing HbA1c, and achieving remission — by directly reducing the glucose load and restoring metabolic flexibility.',
    citation: 'Hallberg 2018; Virta Health 2-year data',
  },
  {
    myth: 'Fasting is dangerous for people with diabetes.',
    truth: 'Time-restricted eating and intermittent fasting are among the most powerful ESD interventions when clinically supervised. They reduce caloric surplus, deplete glycogen, activate fat oxidation, stimulate mitochondrial biogenesis via AMPK, and can eliminate the need for medications.',
    citation: 'Sutton 2018; Lowe 2020',
  },
  {
    myth: 'Type 2 diabetes is primarily genetic.',
    truth: "Genetic variants account for < 20% of T2D risk. The concordance rate in identical twins is ~70% — meaning 30% of genetically identical people don't develop ESD when exposed to the same genes but different environments. Lifestyle and environment are the dominant drivers.",
    citation: 'McCarthy 2010; Poulsen 1999',
  },
]

export default function MythsVsTruth() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="myths" className="bg-cream py-24">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-amber-500/10 text-amber-500 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            Myths & Evidence
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-navy-900 text-balance">
            Diabetes Myths — Corrected
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-lg text-navy-700/70">
            These misconceptions harm patients and delay effective treatment.
            The ESD framework corrects the record.
          </p>
        </div>

        <div className="space-y-3">
          {myths.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm"
            >
              <button
                className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-gray-50 transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-xs font-bold text-red-400 shrink-0 bg-red-50 px-2 py-1 rounded">
                    MYTH
                  </span>
                  <span className="font-semibold text-navy-900 text-sm">{item.myth}</span>
                </div>
                <ChevronDown
                  size={16}
                  className={`text-navy-700/40 shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`}
                />
              </button>

              {open === i && (
                <div className="px-5 pb-5 border-t border-gray-50">
                  <div className="flex items-start gap-3 mt-4">
                    <span className="mt-0.5 text-xs font-bold text-teal-600 shrink-0 bg-teal-50 px-2 py-1 rounded">
                      TRUTH
                    </span>
                    <div>
                      <p className="text-sm text-navy-700/80 leading-relaxed">{item.truth}</p>
                      <p className="mt-3 text-xs text-navy-700/40 italic">
                        Evidence: {item.citation}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
