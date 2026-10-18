import { FlaskConical, AlertTriangle, CheckCircle, TrendingDown } from 'lucide-react'

type Status = 'optimal' | 'warning' | 'concerning'

interface Marker {
  name: string
  category: string
  optimal: string
  borderline: string
  concerning: string
  whyItMatters: string
  esdLink: string
  requestAs: string
}

const markers: Marker[] = [
  {
    name: 'Fasting Insulin',
    category: 'Core ESD Marker',
    optimal: '< 5 μIU/mL',
    borderline: '5–10 μIU/mL',
    concerning: '> 10 μIU/mL',
    whyItMatters: "Fasting insulin is the most sensitive early marker for ESD — it rises years before glucose abnormalities appear. Standard panels don't include it.",
    esdLink: 'Directly reflects ESD Pillar 1: how hard the pancreas is working to overcome cellular resistance.',
    requestAs: '"Fasting insulin" or "serum insulin (fasting)" — must be drawn after 8–12 hours fasting',
  },
  {
    name: 'HOMA-IR',
    category: 'Core ESD Marker',
    optimal: '< 1.0',
    borderline: '1.0–2.9',
    concerning: '≥ 3.0',
    whyItMatters: 'Derived from fasting glucose + fasting insulin. Validated in thousands of population studies. Better than either value alone.',
    esdLink: 'The composite fingerprint of Energy Storage Disease — captures both the lock (insulin resistance) and the key (insulin secretion).',
    requestAs: 'Calculated from fasting insulin + fasting glucose — use our HOMA-IR calculator above',
  },
  {
    name: 'Triglycerides / HDL Ratio',
    category: 'Lipid Panel',
    optimal: '< 1.5 (US: mg/dL ratio)',
    borderline: '1.5–3.0',
    concerning: '> 3.0',
    whyItMatters: 'The triglyceride:HDL ratio is the most predictive cardiovascular marker in insulin-resistant individuals — more than total cholesterol.',
    esdLink: 'ESD directly raises triglycerides (overflow from glucose storage) and lowers HDL (reduced fat clearance). This ratio tracks ESD severity.',
    requestAs: '"Lipid panel" — calculate TG ÷ HDL from the report (both in same units)',
  },
  {
    name: 'Fasting Glucose',
    category: 'Standard Panel',
    optimal: '70–85 mg/dL',
    borderline: '86–99 mg/dL',
    concerning: '≥ 100 mg/dL',
    whyItMatters: "Glucose appears on every metabolic panel but lags insulin by years. 'Normal' fasting glucose can coexist with significant insulin resistance.",
    esdLink: 'In ESD, glucose is a lagging indicator. A 94 mg/dL fasting glucose with a HOMA-IR of 3.5 signals active ESD — standard care misses this.',
    requestAs: '"Fasting blood glucose" or "fasting plasma glucose" — standard on basic metabolic panel',
  },
  {
    name: 'Hemoglobin A1c',
    category: 'Standard Panel',
    optimal: '< 5.0%',
    borderline: '5.0–5.6%',
    concerning: '≥ 5.7%',
    whyItMatters: "A1c reflects average glucose over ~3 months. Useful for tracking progression but a late marker — it rises well after HOMA-IR is already elevated.",
    esdLink: 'In the ESD model, A1c is a downstream consequence, not the disease itself. Treating A1c without treating insulin resistance treats the overflow, not the tank.',
    requestAs: '"HbA1c" or "glycated hemoglobin" — standard; ensure it is not masked by hemoglobin variants (HbS/HbC)',
  },
  {
    name: 'Uric Acid',
    category: 'ESD Marker',
    optimal: '< 5.5 mg/dL',
    borderline: '5.5–6.5 mg/dL',
    concerning: '> 6.5 mg/dL',
    whyItMatters: 'Uric acid rises with fructose metabolism and correlates strongly with insulin resistance. Often overlooked outside gout workup.',
    esdLink: 'Fructose overload (the same dietary pattern that drives ESD) drives uric acid. High uric acid is an independent metabolic risk signal.',
    requestAs: '"Serum uric acid" — not on standard panels; request specifically',
  },
]

const statusConfig: Record<Status, { color: string; icon: typeof CheckCircle; label: string }> = {
  optimal: { color: 'text-teal-400', icon: CheckCircle, label: 'Optimal' },
  warning: { color: 'text-amber-400', icon: TrendingDown, label: 'Watch' },
  concerning: { color: 'text-red-400', icon: AlertTriangle, label: 'Concerning' },
}

interface ThresholdBadgeProps {
  label: string
  value: string
  status: Status
}

function ThresholdBadge({ label, value, status }: ThresholdBadgeProps) {
  const cfg = statusConfig[status]
  const Icon = cfg.icon
  return (
    <div className="flex-1 min-w-0">
      <div className={`text-xs font-semibold mb-0.5 ${cfg.color}`}>
        <Icon size={10} className="inline mr-1" />
        {label}
      </div>
      <div className="text-white text-xs font-mono">{value}</div>
    </div>
  )
}

export default function LabMarkers() {
  return (
    <section id="labs" className="bg-navy-900 py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-teal-500/10 text-teal-400 text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <FlaskConical size={14} />
            Lab Guide
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white text-balance mb-4">
            What to Test. What to Ask For.
          </h2>
          <p className="text-white/50 text-lg leading-relaxed max-w-2xl mx-auto">
            Standard metabolic panels catch ESD late. These are the markers that reveal the disease
            years before glucose becomes abnormal — and most require a specific request.
          </p>
        </div>

        <div className="space-y-4">
          {markers.map((m) => (
            <div
              key={m.name}
              className="bg-navy-800 border border-white/10 rounded-2xl p-6 hover:border-teal-500/30 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Left: marker name + thresholds */}
                <div className="md:w-64 shrink-0">
                  <div className="text-xs text-teal-400/70 font-semibold uppercase tracking-wider mb-1">
                    {m.category}
                  </div>
                  <h3 className="text-white font-bold text-lg mb-4">{m.name}</h3>
                  <div className="flex gap-3">
                    <ThresholdBadge label="Optimal" value={m.optimal} status="optimal" />
                    <ThresholdBadge label="Watch" value={m.borderline} status="warning" />
                    <ThresholdBadge label="Act" value={m.concerning} status="concerning" />
                  </div>
                </div>

                {/* Right: context */}
                <div className="flex-1 space-y-3">
                  <p className="text-white/60 text-sm leading-relaxed">{m.whyItMatters}</p>

                  <div className="flex gap-2">
                    <span className="w-1 bg-teal-500/50 rounded-full shrink-0" />
                    <p className="text-teal-300/70 text-xs leading-relaxed">{m.esdLink}</p>
                  </div>

                  <div className="bg-white/3 rounded-lg px-3 py-2">
                    <span className="text-white/30 text-xs font-semibold uppercase tracking-wider mr-2">
                      Request as:
                    </span>
                    <span className="text-white/50 text-xs">{m.requestAs}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-navy-800 border border-teal-500/20 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="text-white font-semibold mb-1">Ready to get tested?</p>
            <p className="text-white/40 text-sm">
              Join the provider track and we will help you find a metabolic-medicine clinician who
              orders the complete ESD panel — not just A1c.
            </p>
          </div>
          <a
            href="#waitlist"
            className="shrink-0 bg-teal-500 hover:bg-teal-400 text-white font-semibold px-5 py-3 rounded-xl transition-colors text-sm whitespace-nowrap"
          >
            Find a Provider
          </a>
        </div>

        <p className="text-white/15 text-xs text-center mt-6">
          Reference ranges are consensus values from metabolic medicine literature. Individual
          clinical context may shift thresholds. This is educational content, not medical advice.
        </p>
      </div>
    </section>
  )
}
