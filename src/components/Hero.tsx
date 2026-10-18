import { ArrowDown, FlaskConical } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-navy-900 flex items-center overflow-hidden pt-16">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(0,191,165,0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0,191,165,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(0,191,165,0.08) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-6xl mx-auto px-4 py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 text-teal-400 text-sm font-medium px-4 py-2 rounded-full mb-8">
          <FlaskConical size={14} />
          A new framework for metabolic disease
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight text-balance mb-6">
          Diabetes Is{' '}
          <span className="text-teal-400">Misnamed.</span>
          <br />
          It's an Energy Storage Disease.
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/60 leading-relaxed mb-10">
          The word "diabetes" describes overflow — sugar spilling into urine. It says nothing about
          why. Calling it an <strong className="text-white/80">Energy Storage Disease</strong> names
          the root: a breakdown in how cells store, access, and burn energy. That changes
          everything about how we treat it.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a
            href="#framework"
            className="bg-teal-500 hover:bg-teal-400 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 text-base"
          >
            Understand the Framework
          </a>
          <a
            href="#waitlist"
            className="border border-white/20 hover:border-teal-500/50 text-white/80 hover:text-white font-medium px-8 py-4 rounded-xl transition-all text-base"
          >
            Join the Waitlist
          </a>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto border-t border-white/10 pt-12">
          {[
            { value: '537M', label: 'people worldwide live with T2D' },
            { value: '90%', label: 'of cases are Energy Storage Disease' },
            { value: '70%', label: 'preventable with root-cause treatment' },
          ].map((stat) => (
            <div key={stat.value}>
              <div className="text-2xl md:text-3xl font-black text-teal-400">{stat.value}</div>
              <div className="text-white/40 text-xs md:text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <a
        href="#problem"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 hover:text-white/60 transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ArrowDown size={20} />
      </a>
    </section>
  )
}
