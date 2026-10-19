import { useState, useEffect } from 'react'
import { Calculator, AlertCircle, CheckCircle, TrendingUp, TrendingDown, ArrowRight, Share2, Copy, Minus } from 'lucide-react'

type GlucoseUnit = 'mgdl' | 'mmoll'
type InsulinUnit = 'uiu' | 'pmol'

interface Result {
  homaIr: number
  level: 'optimal' | 'acceptable' | 'early' | 'significant' | 'severe'
  label: string
  color: string
  bgColor: string
  borderColor: string
  description: string
  nextStep: string
}

interface HistoryEntry {
  homaIr: number
  level: Result['level']
  label: string
  date: string
}

const HISTORY_KEY = 'esd-homa-history'
const MAX_HISTORY = 10

function loadHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveHistory(entries: HistoryEntry[]) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(entries.slice(-MAX_HISTORY)))
  } catch {}
}

function getResult(homaIr: number): Result {
  if (homaIr < 1.0) return {
    homaIr, level: 'optimal', label: 'Optimal',
    color: 'text-teal-400', bgColor: 'bg-teal-500/10', borderColor: 'border-teal-500/30',
    description: 'Your cells are responding well to insulin. Your mitochondria are efficiently processing fuel.',
    nextStep: 'Maintain your metabolic health with consistent movement, whole foods, and quality sleep.',
  }
  if (homaIr < 2.0) return {
    homaIr, level: 'acceptable', label: 'Acceptable',
    color: 'text-green-400', bgColor: 'bg-green-500/10', borderColor: 'border-green-500/30',
    description: 'Insulin sensitivity is in normal range, though there is room for improvement.',
    nextStep: 'Focus on reducing refined carbohydrate load and increasing post-meal movement.',
  }
  if (homaIr < 3.0) return {
    homaIr, level: 'early', label: 'Early Insulin Resistance',
    color: 'text-amber-400', bgColor: 'bg-amber-500/10', borderColor: 'border-amber-500/30',
    description: 'Your cells are beginning to resist insulin signals — the first stage of Energy Storage Disease. The cascade is starting.',
    nextStep: 'This is the intervention window. Time-restricted eating, strength training, and reducing ultra-processed foods can reverse this.',
  }
  if (homaIr < 5.0) return {
    homaIr, level: 'significant', label: 'Significant Insulin Resistance',
    color: 'text-orange-400', bgColor: 'bg-orange-500/10', borderColor: 'border-orange-500/30',
    description: 'Clear energy storage dysfunction. Your pancreas is working overtime to compensate. Mitochondrial stress is likely elevated.',
    nextStep: 'Work with a metabolic-aware clinician. A low-carbohydrate dietary intervention has the strongest evidence base at this level.',
  }
  return {
    homaIr, level: 'severe', label: 'Advanced Insulin Resistance',
    color: 'text-red-400', bgColor: 'bg-red-500/10', borderColor: 'border-red-500/30',
    description: 'Severe insulin resistance. Glucose overflow into fat storage is likely active. The Energy Storage Disease cascade is well underway.',
    nextStep: 'Seek metabolic medicine evaluation. Ketogenic or very-low-carbohydrate diets have demonstrated reversal in clinical trials (DiRECT, Virta).',
  }
}

function toMgDl(value: number, unit: GlucoseUnit): number {
  return unit === 'mmoll' ? value * 18.0182 : value
}

function toUiu(value: number, unit: InsulinUnit): number {
  return unit === 'pmol' ? value / 6.945 : value
}

const BAR_RANGES = [
  { max: 1.0, label: 'Optimal', color: 'bg-teal-500' },
  { max: 2.0, label: 'Acceptable', color: 'bg-green-500' },
  { max: 3.0, label: 'Early IR', color: 'bg-amber-500' },
  { max: 5.0, label: 'Significant', color: 'bg-orange-500' },
  { max: 8.0, label: 'Advanced', color: 'bg-red-500' },
]

const LEVEL_COLOR: Record<Result['level'], string> = {
  optimal: 'text-teal-400',
  acceptable: 'text-green-400',
  early: 'text-amber-400',
  significant: 'text-orange-400',
  severe: 'text-red-400',
}

const LEVEL_ORDER: Result['level'][] = ['optimal', 'acceptable', 'early', 'significant', 'severe']

function ScaleBar({ value }: { value: number }) {
  const clampedPct = Math.min((value / 8.0) * 100, 100)
  return (
    <div className="mt-6">
      <div className="flex text-xs text-white/30 justify-between mb-1">
        <span>0</span>
        <span>2</span>
        <span>4</span>
        <span>6</span>
        <span>8+</span>
      </div>
      <div className="relative h-3 rounded-full overflow-hidden flex">
        {BAR_RANGES.map((r, i) => {
          const prev = i === 0 ? 0 : BAR_RANGES[i - 1].max
          const width = ((r.max - prev) / 8.0) * 100
          return (
            <div key={r.label} className={`h-full ${r.color} opacity-40`} style={{ width: `${width}%` }} />
          )
        })}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-5 rounded-sm bg-white shadow-lg"
          style={{ left: `calc(${clampedPct}% - 6px)` }}
        />
      </div>
      <div className="flex text-xs text-white/30 justify-between mt-1">
        {BAR_RANGES.map((r) => (
          <span key={r.label} className="text-center" style={{ width: `${((r.max - (BAR_RANGES[BAR_RANGES.indexOf(r) - 1]?.max ?? 0)) / 8.0) * 100}%` }}>
            {r.label}
          </span>
        ))}
      </div>
    </div>
  )
}

function TrendIcon({ current, previous }: { current: number; previous: number }) {
  if (current === previous) return <Minus size={14} className="text-white/40" />
  if (current < previous) return <TrendingDown size={14} className="text-teal-400" />
  return <TrendingUp size={14} className="text-orange-400" />
}

function HistoryRow({ entry, isLatest }: { entry: HistoryEntry; isLatest: boolean }) {
  return (
    <div className={`flex items-center justify-between py-2 border-b border-white/5 last:border-0 ${isLatest ? 'opacity-100' : 'opacity-60'}`}>
      <span className="text-white/40 text-xs">{entry.date}</span>
      <span className={`text-sm font-bold ${LEVEL_COLOR[entry.level]}`}>{entry.homaIr}</span>
      <span className={`text-xs ${LEVEL_COLOR[entry.level]}`}>{entry.label}</span>
    </div>
  )
}

export default function HomaIrCalculator() {
  const [glucose, setGlucose] = useState('')
  const [insulin, setInsulin] = useState('')
  const [glucoseUnit, setGlucoseUnit] = useState<GlucoseUnit>('mgdl')
  const [insulinUnit, setInsulinUnit] = useState<InsulinUnit>('uiu')
  const [result, setResult] = useState<Result | null>(null)
  const [copied, setCopied] = useState(false)
  const [history, setHistory] = useState<HistoryEntry[]>([])

  useEffect(() => {
    setHistory(loadHistory())
  }, [])

  const glucoseMgDl = toMgDl(parseFloat(glucose), glucoseUnit)
  const insulinUiu = toUiu(parseFloat(insulin), insulinUnit)
  const canCalculate = !isNaN(glucoseMgDl) && !isNaN(insulinUiu) && glucoseMgDl > 0 && insulinUiu > 0

  const calculate = () => {
    if (!canCalculate) return
    const homaIr = (glucoseMgDl * insulinUiu) / 405
    const r = getResult(Math.round(homaIr * 100) / 100)
    setResult(r)

    const entry: HistoryEntry = {
      homaIr: r.homaIr,
      level: r.level,
      label: r.label,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    }
    const updated = [...history, entry]
    setHistory(updated)
    saveHistory(updated)
  }

  const reset = () => {
    setGlucose('')
    setInsulin('')
    setResult(null)
    setCopied(false)
  }

  const shareResult = async (r: Result) => {
    const text = `My HOMA-IR score is ${r.homaIr} (${r.label}). HOMA-IR measures insulin resistance — the root mechanism of Energy Storage Disease. Learn more: https://energystoragedisease.com/#calculator`
    if (navigator.share) {
      await navigator.share({ title: 'My HOMA-IR Score', text }).catch(() => null)
    } else {
      await navigator.clipboard.writeText(text).catch(() => null)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  const prevEntry = history.length >= 2 ? history[history.length - 2] : null
  const showHistory = history.length > 1

  return (
    <section id="calculator" className="bg-navy-800 py-24">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-teal-500/10 text-teal-400 text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <Calculator size={14} />
            HOMA-IR Calculator
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white text-balance mb-4">
            Measure Your Energy Storage Risk
          </h2>
          <p className="text-white/50 text-lg leading-relaxed max-w-xl mx-auto">
            HOMA-IR (Homeostatic Model Assessment of Insulin Resistance) is the most accessible
            clinical marker for early Energy Storage Disease. You need two fasting lab values.
          </p>
        </div>

        <div className="bg-navy-900 rounded-2xl border border-white/10 p-6 md:p-8">
          {!result ? (
            <div className="space-y-6">
              {/* Glucose input */}
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Fasting Glucose
                </label>
                <div className="flex gap-3">
                  <input
                    type="number"
                    value={glucose}
                    onChange={(e) => setGlucose(e.target.value)}
                    placeholder={glucoseUnit === 'mgdl' ? 'e.g. 95' : 'e.g. 5.3'}
                    className="flex-1 bg-white/5 border border-white/10 text-white placeholder-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500/50 transition-colors"
                  />
                  <div className="flex rounded-xl border border-white/10 overflow-hidden text-sm">
                    <button
                      type="button"
                      onClick={() => setGlucoseUnit('mgdl')}
                      className={`px-3 py-2 transition-colors ${glucoseUnit === 'mgdl' ? 'bg-teal-500 text-white' : 'bg-white/5 text-white/40 hover:text-white/70'}`}
                    >
                      mg/dL
                    </button>
                    <button
                      type="button"
                      onClick={() => setGlucoseUnit('mmoll')}
                      className={`px-3 py-2 transition-colors ${glucoseUnit === 'mmoll' ? 'bg-teal-500 text-white' : 'bg-white/5 text-white/40 hover:text-white/70'}`}
                    >
                      mmol/L
                    </button>
                  </div>
                </div>
              </div>

              {/* Insulin input */}
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Fasting Insulin
                </label>
                <div className="flex gap-3">
                  <input
                    type="number"
                    value={insulin}
                    onChange={(e) => setInsulin(e.target.value)}
                    placeholder={insulinUnit === 'uiu' ? 'e.g. 8' : 'e.g. 55'}
                    className="flex-1 bg-white/5 border border-white/10 text-white placeholder-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500/50 transition-colors"
                  />
                  <div className="flex rounded-xl border border-white/10 overflow-hidden text-sm">
                    <button
                      type="button"
                      onClick={() => setInsulinUnit('uiu')}
                      className={`px-3 py-2 transition-colors ${insulinUnit === 'uiu' ? 'bg-teal-500 text-white' : 'bg-white/5 text-white/40 hover:text-white/70'}`}
                    >
                      μIU/mL
                    </button>
                    <button
                      type="button"
                      onClick={() => setInsulinUnit('pmol')}
                      className={`px-3 py-2 transition-colors ${insulinUnit === 'pmol' ? 'bg-teal-500 text-white' : 'bg-white/5 text-white/40 hover:text-white/70'}`}
                    >
                      pmol/L
                    </button>
                  </div>
                </div>
              </div>

              {/* Formula hint */}
              <div className="bg-white/3 rounded-xl p-4 text-xs text-white/30 font-mono">
                HOMA-IR = (Glucose mg/dL × Insulin μIU/mL) ÷ 405
              </div>

              <button
                onClick={calculate}
                disabled={!canCalculate}
                className="w-full bg-teal-500 hover:bg-teal-400 disabled:opacity-30 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Calculator size={16} />
                Calculate HOMA-IR
              </button>

              <p className="text-white/20 text-xs text-center">
                Both values must be from a fasting blood draw (8–12 hours fasting).
                This calculator is for educational use only — not a diagnostic tool.
              </p>

              {/* Prior history preview when on input screen */}
              {showHistory && (
                <div className="border-t border-white/5 pt-4">
                  <p className="text-white/30 text-xs mb-3">Your recent readings (stored on this device)</p>
                  {history.slice(-3).reverse().map((e, i) => (
                    <HistoryRow key={i} entry={e} isLatest={i === 0} />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Score */}
              <div className={`rounded-xl border p-6 text-center ${result.bgColor} ${result.borderColor}`}>
                <p className="text-white/50 text-sm mb-1">Your HOMA-IR Score</p>
                <p className={`text-6xl font-black mb-2 ${result.color}`}>{result.homaIr}</p>
                <div className={`inline-flex items-center gap-2 text-sm font-semibold px-3 py-1 rounded-full ${result.bgColor} ${result.color}`}>
                  {prevEntry && (
                    <TrendIcon current={result.homaIr} previous={prevEntry.homaIr} />
                  )}
                  {result.label}
                </div>
                {prevEntry && (
                  <p className="text-white/30 text-xs mt-2">
                    {result.homaIr < prevEntry.homaIr
                      ? `↓ ${(prevEntry.homaIr - result.homaIr).toFixed(2)} improvement from last reading (${prevEntry.homaIr})`
                      : result.homaIr > prevEntry.homaIr
                      ? `↑ ${(result.homaIr - prevEntry.homaIr).toFixed(2)} increase from last reading (${prevEntry.homaIr})`
                      : `No change from last reading (${prevEntry.homaIr})`
                    }
                  </p>
                )}
              </div>

              {/* Scale bar */}
              <ScaleBar value={result.homaIr} />

              {/* Interpretation */}
              <div className="space-y-4">
                <div className="flex gap-3">
                  {result.level === 'optimal' || result.level === 'acceptable'
                    ? <CheckCircle size={20} className={`mt-0.5 shrink-0 ${result.color}`} />
                    : <AlertCircle size={20} className={`mt-0.5 shrink-0 ${result.color}`} />
                  }
                  <div>
                    <p className="text-white font-medium text-sm mb-1">What this means</p>
                    <p className="text-white/60 text-sm leading-relaxed">{result.description}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <TrendingUp size={20} className="text-teal-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-white font-medium text-sm mb-1">Recommended next step</p>
                    <p className="text-white/60 text-sm leading-relaxed">{result.nextStep}</p>
                  </div>
                </div>
              </div>

              {/* History trend when ≥2 entries */}
              {showHistory && (
                <div className="bg-white/3 rounded-xl p-4">
                  <p className="text-white/40 text-xs mb-3 font-medium uppercase tracking-wider">Your History (this device)</p>
                  {history.slice(-5).reverse().map((e, i) => (
                    <HistoryRow key={i} entry={e} isLatest={i === 0} />
                  ))}
                  {LEVEL_ORDER.indexOf(result.level) < LEVEL_ORDER.indexOf(history[history.length - 2]?.level ?? result.level) && (
                    <p className="text-teal-400 text-xs mt-3">Your insulin resistance is improving. Keep going.</p>
                  )}
                  {LEVEL_ORDER.indexOf(result.level) > LEVEL_ORDER.indexOf(history[history.length - 2]?.level ?? result.level) && (
                    <p className="text-amber-400 text-xs mt-3">Your insulin resistance has worsened. Review your lifestyle inputs with a provider.</p>
                  )}
                </div>
              )}

              {/* ESD connection */}
              <div className="bg-white/3 rounded-xl p-4">
                <p className="text-white/40 text-xs leading-relaxed">
                  HOMA-IR directly measures the core mechanism of Energy Storage Disease: how efficiently
                  insulin unlocks your cells to accept glucose. A rising HOMA-IR is the earliest detectable
                  signal of the ESD cascade — often years before fasting glucose becomes abnormal.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={reset}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-medium py-3 rounded-xl transition-colors text-sm"
                >
                  Recalculate
                </button>
                <button
                  onClick={() => shareResult(result)}
                  className="bg-white/5 hover:bg-white/10 text-white/50 hover:text-white px-4 py-3 rounded-xl transition-colors text-sm flex items-center gap-2"
                  title="Share result"
                >
                  {copied ? <Copy size={14} className="text-teal-400" /> : <Share2 size={14} />}
                  {copied ? 'Copied' : 'Share'}
                </button>
                <a
                  href="#waitlist"
                  className="flex-1 bg-teal-500 hover:bg-teal-400 text-white font-semibold py-3 rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
                >
                  Get ESD Insights
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Reference note */}
        <p className="text-white/20 text-xs text-center mt-4">
          Reference: Matthews DR et al. (1985). Readings stored locally on your device only — no account required.
        </p>
      </div>
    </section>
  )
}
