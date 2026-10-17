export default function Footer() {
  return (
    <footer className="bg-navy-900 border-t border-white/5 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-teal-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">E</span>
            </div>
            <span className="text-white font-bold">energystoragedisease.com</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-white/40">
            <a href="#framework" className="hover:text-white/70 transition-colors">
              ESD Framework
            </a>
            <a href="#cascade" className="hover:text-white/70 transition-colors">
              The Cascade
            </a>
            <a href="#myths" className="hover:text-white/70 transition-colors">
              Myths
            </a>
            <a href="#waitlist" className="hover:text-white/70 transition-colors">
              Join Waitlist
            </a>
          </div>

          <div className="text-white/20 text-xs text-center">
            © 2026 energystoragedisease.com
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-white/20 text-xs max-w-2xl mx-auto leading-relaxed">
            This platform is for educational and informational purposes only. ESD content does not
            constitute medical advice. Always consult a qualified healthcare provider before making
            changes to your treatment plan. "Energy Storage Disease" is an educational reframing of
            Type 2 Diabetes Mellitus (ICD-10: E11) to better reflect its metabolic root cause.
          </p>
        </div>
      </div>
    </footer>
  )
}
