import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'

type Track = 'patient' | 'provider' | 'researcher'

export default function WaitlistSection() {
  const [email, setEmail] = useState('')
  const [track, setTrack] = useState<Track>('patient')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, track }),
      })
      if (!res.ok) throw new Error('Failed')
      setSubmitted(true)
    } catch {
      setError('Something went wrong — please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="waitlist" className="bg-navy-900 py-24">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="inline-block bg-teal-500/10 text-teal-400 text-sm font-semibold px-4 py-2 rounded-full mb-6">
          Early Access
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-white text-balance mb-4">
          Join the ESD Movement
        </h2>
        <p className="text-white/50 text-lg mb-10 leading-relaxed">
          We're building tools, protocols, and community for everyone who believes metabolic disease
          deserves a root-cause name and a root-cause treatment. Be first to access.
        </p>

        {submitted ? (
          <div className="bg-teal-500/10 border border-teal-500/30 rounded-2xl p-8 text-center">
            <CheckCircle size={40} className="text-teal-400 mx-auto mb-4" />
            <h3 className="text-white font-bold text-xl mb-2">You're on the list.</h3>
            <p className="text-white/50 text-sm">
              We'll reach out with early access to the {track} track. Expect something meaningful,
              not noise.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Track selector */}
            <div className="flex gap-2 justify-center">
              {(['patient', 'provider', 'researcher'] as Track[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTrack(t)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                    track === t
                      ? 'bg-teal-500 text-white'
                      : 'bg-white/5 text-white/50 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500/50 transition-colors"
              />
              <button
                type="submit"
                disabled={loading || !email}
                className="bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-white font-semibold px-5 py-3 rounded-xl transition-colors flex items-center gap-2 text-sm whitespace-nowrap"
              >
                {loading ? (
                  <span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                ) : (
                  <>
                    <Send size={14} />
                    Join Waitlist
                  </>
                )}
              </button>
            </div>

            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            <p className="text-white/25 text-xs">
              No spam. No selling your data. Unsubscribe anytime. HIPAA-conscious by design.
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
