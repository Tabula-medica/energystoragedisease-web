import { AlertTriangle, CheckCircle } from 'lucide-react'

const oldModel = [
  'A blood sugar problem — manage glucose numbers',
  'Chronic and progressive — expect to add medications over time',
  'Genetic fate — runs in families, hard to reverse',
  'Treated with drugs that lower glucose without fixing the cause',
  'Defined by HbA1c thresholds set for drug trial endpoints',
]

const newModel = [
  'An energy storage & utilization disorder — fix the machinery',
  'Often reversible — metabolic health can be restored',
  'Lifestyle-driven — environment overwhelms genetic predisposition',
  'Treated by restoring cellular energy function and metabolic flexibility',
  'Defined by metabolic biomarker panels that reflect root cause',
]

export default function ProblemSection() {
  return (
    <section id="problem" className="bg-cream py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-amber-500/10 text-amber-500 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            The Framing Problem
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-navy-900 text-balance">
            What Medicine Got Wrong
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-navy-700/70">
            The conventional model treats the overflow symptom — high blood sugar — not the storage
            failure that caused it. Patients are managed instead of healed.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Old model */}
          <div className="bg-white rounded-2xl p-8 border border-red-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                <AlertTriangle size={20} className="text-red-400" />
              </div>
              <div>
                <div className="text-xs text-red-400 font-semibold uppercase tracking-wider">
                  Current model
                </div>
                <div className="font-bold text-navy-900">Diabetes = Blood Sugar Disease</div>
              </div>
            </div>
            <ul className="space-y-3">
              {oldModel.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-navy-700/70">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-red-300 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* New model */}
          <div className="bg-teal-500/5 rounded-2xl p-8 border border-teal-500/20 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-teal-500/10 rounded-xl flex items-center justify-center">
                <CheckCircle size={20} className="text-teal-600" />
              </div>
              <div>
                <div className="text-xs text-teal-600 font-semibold uppercase tracking-wider">
                  ESD model
                </div>
                <div className="font-bold text-navy-900">Diabetes = Energy Storage Disease</div>
              </div>
            </div>
            <ul className="space-y-3">
              {newModel.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-navy-700">
                  <CheckCircle size={14} className="mt-0.5 text-teal-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pull quote */}
        <blockquote className="mt-12 text-center max-w-3xl mx-auto">
          <p className="text-2xl md:text-3xl font-light text-navy-800 italic leading-relaxed">
            "Lowering blood sugar without restoring energy metabolism is like mopping the floor
            while the tap is still running."
          </p>
        </blockquote>
      </div>
    </section>
  )
}
