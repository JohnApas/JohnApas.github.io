import { useState } from 'react'
import { useScrollToSection } from '../../hooks/useScrollToSection'

const navItems = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Skills', id: 'skills' },
  { label: 'Contact', id: 'contact' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { scrollToSection } = useScrollToSection()

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId)
    setIsOpen(false)
  }

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-space-dark/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <button
          onClick={() => handleNavClick('home')}
          className="text-lg font-bold text-highlight transition-colors hover:text-white"
        >
          JA
        </button>

        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleNavClick(item.id)}
                className="text-sm text-text-muted transition-colors hover:text-highlight"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 bg-text transition-transform ${isOpen ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span
            className={`block h-0.5 w-6 bg-text transition-opacity ${isOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block h-0.5 w-6 bg-text transition-transform ${isOpen ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-white/5 bg-space-dark/95 px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-4">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  className="text-sm text-text-muted transition-colors hover:text-highlight"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
