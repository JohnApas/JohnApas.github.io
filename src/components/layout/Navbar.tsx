import { useEffect, useState } from 'react'
import logo from '../../assets/apas-white.png'
import { ThemeToggle } from '../common/ThemeToggle'
import { useScrollToSection } from '../../hooks/useScrollToSection'
import { useTheme } from '../../hooks/useTheme'

const navItems = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Services', id: 'services' },
  { label: 'Contact', id: 'contact' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { scrollToSection } = useScrollToSection()
  const { theme } = useTheme()

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId)
    setIsOpen(false)
  }

  useEffect(() => {
    if (!isOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border bg-space-dark/70 pt-[env(safe-area-inset-top)] backdrop-blur-xl">
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6 md:h-[72px]">
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center transition-opacity hover:opacity-80"
          aria-label="Home"
        >
          <img
            src={logo}
            alt="Apas"
            className={`h-7 w-auto object-contain sm:h-8 md:h-10 ${theme === 'light' ? 'invert' : ''}`}
          />
        </button>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  className="text-[15px] text-text/80 transition-colors hover:text-text"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <span
              className={`block h-0.5 w-5 bg-text transition-transform ${isOpen ? 'translate-y-2 rotate-45' : ''}`}
            />
            <span
              className={`block h-0.5 w-5 bg-text transition-opacity ${isOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block h-0.5 w-5 bg-text transition-transform ${isOpen ? '-translate-y-2 -rotate-45' : ''}`}
            />
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="max-h-[calc(100svh-3.5rem-env(safe-area-inset-top))] overflow-y-auto border-t border-border bg-space-dark/95 px-4 py-5 backdrop-blur-xl sm:px-6 md:hidden">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  className="w-full rounded-xl px-3 py-3 text-left text-base text-text/80 transition-colors hover:bg-text/5 hover:text-text"
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
