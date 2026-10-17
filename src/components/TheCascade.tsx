const stages = [
  {
    year: 'Years 1–5',
    title: 'Metabolic Inflexibility Begins',
    body: 'Persistent caloric surplus starts filling glycogen stores. The body begins favoring glucose over fat for fuel. Mild insulin resistance develops silently — no symptoms, normal fasting glucose.',
    markers: ['Postprandial glucose spikes', 'Declining metabolic flexibility', 'Rising fasting insulin'],
    color: 'border-green-400',
    dot: 'bg-green-400',
  },
  {
    year: 'Years 5–10',
    title: 'Storage Overflow Cascade',
    body: 'Glycogen capacity is exceeded. The body shifts to visceral and ectopic fat storage — depositing fat in the liver and pancreas. Mitochondrial density begins to decline. Fatigue, brain fog, and weight gain appear.',
    markers: ['Elevated triglycerides', 'Rising HbA1c (5.7–6.4%)', 'Increasing waist circumference', 'Non-alcoholic fatty liver'],
    color: 'border-amber-400',
    dot: 'bg-amber-400',
  },
  {
    year: 'Years 10–15',
    title: 'Pancreatic Beta Cell Stress',
    body: 'Ectopic fat in the pancreas impairs beta cell function. Insulin secretion becomes irregular. Compensatory hyperinsulinemia begins to fail. Fasting glucose starts climbing. The "diagnosis" is made — but the process began years ago.',
    markers: ['FBG > 126 mg/dL', 'HbA1c > 6.5%', 'Declining C-peptide', 'Type 2 DM diagnosis'],
    color: 'border-orange-400',
    dot: 'bg-orange-400',
  },
  {
    year: 'Years 15+',
    title: 'Systemic Energy Failure',
    body: 'Mitochondrial dysfunction is widespread. Chronic inflammation impairs energy utilization throughout the body — cardiovascular, renal, neurological, and retinal systems are affected. The disease is now systemic.',
    markers: ['Cardiovascular disease risk', 'Chronic kidney disease', 'Diabetic neuropathy', 'Retinopathy'],
    color: 'border-red-400',
    dot: 'bg-red-400',
  },
]

export default function TheCascade() {
  return (
    <section id="cascade" className="bg-navy-900 py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-teal-500/10 text-teal-400 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            Disease Progression
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white text-balance">
            The ESD Cascade
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-white/50">
            Type 2 diabetes doesn't begin at diagnosis. The ESD cascade starts 10–15 years earlier —
            invisible to the conventional blood sugar model.
          </p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/10 transform md:-translate-x-px" />

          <div className="space-y-12">
            {stages.map((stage, i) => (
              <div
                key={stage.year}
                className={`relative flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-12`}
              >
                {/* Dot */}
                <div
                  className={`absolute left-6 md:left-1/2 top-6 w-3 h-3 rounded-full ${stage.dot} transform -translate-x-1.5 md:-translate-x-1.5 z-10 ring-4 ring-navy-900`}
                />

                {/* Content */}
                <div className={`ml-14 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-teal-500/30 transition-colors">
                    <div className="text-teal-400 text-xs font-semibold uppercase tracking-wider mb-1">
                      {stage.year}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{stage.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed mb-4">{stage.body}</p>
                    <div className={`flex flex-wrap gap-2 ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                      {stage.markers.map((m) => (
                        <span
                          key={m}
                          className="text-xs bg-white/5 border border-white/10 text-white/60 px-2 py-1 rounded-full"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Spacer for other side */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-white/40 text-sm max-w-xl mx-auto">
            The ESD model reframes diagnosis as an opportunity to reverse the cascade — not just
            manage the endpoint. Remission is possible at every stage with root-cause intervention.
          </p>
        </div>
      </div>
    </section>
  )
}
