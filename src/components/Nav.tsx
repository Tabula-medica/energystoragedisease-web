import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'What Is ESD?', href: '#framework' },
  { label: 'The Cascade', href: '#cascade' },
  { label: 'HOMA-IR', href: '#calculator' },
  { label: 'Research', href: '#research' },
  { label: 'Myths', href: '#myths' },
  { label: 'Join Waitlist', href: '#waitlist' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy-900/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">E</span>
          </div>
          <span className="text-white font-bold text-lg tracking-tight">ESD</span>
          <span className="hidden sm:block text-white/40 text-sm ml-1">energystoragedisease.com</span>
        </a>

        <nav className="hidden md:flex items-center gap-6">
          {links.slice(0, -1).map((l) => (
            <a key={l.href} href={l.href} className="text-white/70 hover:text-white text-sm transition-colors">
              {l.label}
            </a>
          ))}
          <a
            href="#waitlist"
            className="bg-teal-500 hover:bg-teal-400 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Join Waitlist
          </a>
        </nav>

        <button
          className="md:hidden text-white/70 hover:text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-navy-900 border-t border-white/10 px-4 py-4 space-y-3">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-white/80 hover:text-white text-sm py-2 transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
