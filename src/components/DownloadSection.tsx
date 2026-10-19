export default function DownloadSection() {
  return (
    <section id="download" className="py-24 bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
          <span className="text-teal-400 text-sm font-medium tracking-wide uppercase">Free App</span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Take the HOMA-IR Calculator With You
        </h2>
        <p className="text-lg text-white/60 max-w-xl mx-auto mb-12">
          Calculate your HOMA-IR score, track your results, and access the full ESD lab guide
          — all on your phone. No account required.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* App Store */}
          <a
            href="https://apps.apple.com/app/id6824261239"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 bg-white hover:bg-white/90 text-slate-900 rounded-xl px-6 py-3.5 font-semibold transition-all duration-200 shadow-lg shadow-white/10 hover:shadow-white/20 hover:-translate-y-0.5"
          >
            <svg viewBox="0 0 24 24" className="w-7 h-7 flex-shrink-0" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <div className="text-left">
              <div className="text-xs text-slate-500 leading-none mb-0.5">Download on the</div>
              <div className="text-base leading-none">App Store</div>
            </div>
          </a>

          {/* Google Play */}
          <a
            href="https://play.google.com/store/apps/details?id=com.energystoragedisease.app"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 bg-white hover:bg-white/90 text-slate-900 rounded-xl px-6 py-3.5 font-semibold transition-all duration-200 shadow-lg shadow-white/10 hover:shadow-white/20 hover:-translate-y-0.5"
          >
            <svg viewBox="0 0 24 24" className="w-7 h-7 flex-shrink-0" fill="currentColor">
              <path d="M3.18 23.76c.35.2.74.24 1.12.1L14.9 12 11.05 8.15 3.18 23.76zm17.14-10.66L17.6 11.5 5.8.42C5.42.16 4.98.08 4.58.24L16.5 12l3.82-3.82a1.33 1.33 0 000-1.9l-14.09-7.5c-.4-.23-.88-.2-1.25.07l12.45 12.45 2.9-1.7c.57-.34.57-1.16-.01-1.5zM3.05.34C2.9.6 2.82.92 2.82 1.27v21.46c0 .35.09.67.23.93L14.9 12 3.05.34z" />
            </svg>
            <div className="text-left">
              <div className="text-xs text-slate-500 leading-none mb-0.5">Get it on</div>
              <div className="text-base leading-none">Google Play</div>
            </div>
          </a>
        </div>

        <p className="mt-6 text-white/30 text-sm">iOS 16+ · Android 8+</p>

        {/* Feature callouts */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          {[
            { icon: '🧮', title: 'HOMA-IR Calculator', body: 'Enter fasting glucose + insulin for your risk score with 5-tier classification and trend tracking across 10 readings.' },
            { icon: '🧪', title: '6-Marker Lab Guide', body: 'Exact thresholds + wording to request from your doctor.' },
            { icon: '🔒', title: 'Private by Design', body: 'No account. No cloud. History stored encrypted on your device — never transmitted.' },
          ].map(f => (
            <div key={f.title} className="bg-white/5 rounded-xl p-5 border border-white/8">
              <div className="text-2xl mb-3">{f.icon}</div>
              <h3 className="text-white font-semibold mb-1.5">{f.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
