import { useEffect, useRef, useState } from 'react'
import { aboutMe } from '../../data/aboutMe'
import { profile } from '../../data/profile'
import { formatDateRange } from '../../utils/formatDate'
import { Card } from '../common/Card'

const SLIDE_COUNT = 2
const AUTO_ROTATE_MS = 6000
/** Keep in sync with the flex `gap-*` class below */
const SLIDE_GAP = '2rem'

interface AboutCarouselProps {
  onSlideChange?: () => void
}

export function AboutCarousel({ onSlideChange }: AboutCarouselProps) {
  const [activeSlide, setActiveSlide] = useState(0)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    onSlideChange?.()
  }, [activeSlide, onSlideChange])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % SLIDE_COUNT)
    }, AUTO_ROTATE_MS)

    return () => window.clearInterval(timer)
  }, [activeSlide])

  const goToSlide = (index: number) => {
    if (index === activeSlide) return
    setActiveSlide(index)
  }

  return (
    <div>
      <div className="relative overflow-hidden">
        <div
          className="flex gap-8 transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(calc(-${activeSlide} * (100% + ${SLIDE_GAP})))`,
          }}
        >
          <div className="w-full shrink-0">
            <EducationSlide />
          </div>
          <div className="w-full shrink-0">
            <SkillsSlide />
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-3">
        {Array.from({ length: SLIDE_COUNT }, (_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goToSlide(index)}
            aria-label={
              index === 0
                ? `Show ${aboutMe.educationTitle}`
                : `Show ${aboutMe.skillsTitle}`
            }
            className={`rounded-full transition-all duration-500 ${
              activeSlide === index
                ? 'h-2.5 w-2.5 bg-highlight shadow-[0_0_10px_rgba(34,211,238,0.7)]'
                : 'h-1.5 w-1.5 bg-white/25 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

function EducationSlide() {
  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold text-highlight">
        {aboutMe.educationTitle}
      </h3>
      <div className="space-y-4">
        {aboutMe.education.map((edu) => (
          <Card key={`${edu.schoolName}-${edu.course}`}>
            <h4 className="font-semibold">{edu.schoolName}</h4>
            <p className="text-sm text-text-muted">{edu.course}</p>
            {(edu.startDate || edu.endDate) && (
              <p className="mt-1 text-xs text-accent">
                {formatDateRange(edu.startDate, edu.endDate)}
              </p>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}

function SkillsSlide() {
  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold text-highlight">
        {aboutMe.skillsTitle}
      </h3>
      <div className="flex flex-wrap gap-2">
        {profile.skills.map((skill) => (
          <span
            key={skill.name}
            className="rounded-full border border-highlight/30 bg-highlight/10 px-3 py-1.5 text-sm text-highlight transition-colors hover:border-highlight/60 hover:bg-highlight/20"
          >
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  )
}
