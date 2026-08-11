import type { ReactNode } from 'react'
import { StarBackground } from '../common/StarBackground'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen bg-space-dark text-text">
      <StarBackground />
      <Navbar />
      <main className="relative z-10">{children}</main>
      <Footer />
    </div>
  )
}
