import type { ReactNode } from 'react'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-space-dark text-text">
      <Navbar />
      <main className="relative z-10 min-w-0">{children}</main>
      <Footer />
    </div>
  )
}
