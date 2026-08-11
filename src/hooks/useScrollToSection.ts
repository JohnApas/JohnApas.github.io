import { useCallback } from 'react'

export function useScrollToSection() {
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (!element) return

    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return { scrollToSection }
}
