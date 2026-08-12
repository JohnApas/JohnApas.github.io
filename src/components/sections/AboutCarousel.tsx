import { useEffect, useRef, useState } from 'react'
import { aboutMe } from '../../data/aboutMe'
import { profile } from '../../data/profile'
import { formatDateRange } from '../../utils/formatDate'
import { Card } from '../common/Card'

const SLIDES = [
  { id: 'education', label: aboutMe.educationTitle },
  { id: 'skills', label: aboutMe.skillsTitle },
] as const

const SLIDE_COUNT = SLIDES.length
const LOOP_SETS = 3
const MIDDLE_SET = 1
const AUTO_ROTATE_MS = 6000

export function AboutCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [stride, setStride] = useState(0)
  const jumping = useRef(false)
  const settleTimer = useRef(0)
  const activeSlideRef = useRef(0)
  const strideRef = useRef(0)

  const logicalIndex = (raw: number) =>
    ((raw % SLIDE_COUNT) + SLIDE_COUNT) % SLIDE_COUNT

  const measureStride = () => {
    const scroller = scrollerRef.current
    if (!scroller) return 0
    const track = scroller.firstElementChild as HTMLElement | null
    if (!track || track.children.length < 2) return scroller.clientWidth
    const first = track.children[0] as HTMLElement
    const second = track.children[1] as HTMLElement
    return second.offsetLeft - first.offsetLeft
  }

  const scrollToRaw = (rawIndex: number, behavior: ScrollBehavior = 'smooth') => {
    const scroller = scrollerRef.current
    const width = strideRef.current
    if (!scroller || !width) return
    scroller.scrollTo({ left: rawIndex * width, behavior })
  }

  const goToSlide = (index: number) => {
    const next = logicalIndex(index)
    if (next === activeSlide && !jumping.current) return
    activeSlideRef.current = next
    setActiveSlide(next)
    scrollToRaw(MIDDLE_SET * SLIDE_COUNT + next)
  }

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const sync = () => {
      const next = measureStride()
      strideRef.current = next
      setStride(next)
      if (next > 0) {
        jumping.current = true
        scroller.scrollLeft =
          (MIDDLE_SET * SLIDE_COUNT + activeSlideRef.current) * next
        requestAnimationFrame(() => {
          jumping.current = false
        })
      }
    }

    sync()
    const observer = new ResizeObserver(sync)
    observer.observe(scroller)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller || !stride) return

    const normalizeLoop = () => {
      const width = strideRef.current
      if (!width) return

      const raw = Math.round(scroller.scrollLeft / width)
      const set = Math.floor(raw / SLIDE_COUNT)

      if (set === MIDDLE_SET) return

      jumping.current = true
      const logical = logicalIndex(raw)
      scroller.scrollLeft = (MIDDLE_SET * SLIDE_COUNT + logical) * width
      requestAnimationFrame(() => {
        jumping.current = false
      })
    }

    const onScroll = () => {
      const width = strideRef.current
      if (jumping.current || !width) return

      const raw = Math.round(scroller.scrollLeft / width)
      const logical = logicalIndex(raw)
      activeSlideRef.current = logical
      setActiveSlide(logical)

      window.clearTimeout(settleTimer.current)
      settleTimer.current = window.setTimeout(normalizeLoop, 80)
    }

    scroller.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      scroller.removeEventListener('scroll', onScroll)
      window.clearTimeout(settleTimer.current)
    }
  }, [stride])

  useEffect(() => {
    if (isPaused || !stride) return

    const timer = window.setInterval(() => {
      const scroller = scrollerRef.current
      const width = strideRef.current
      if (!scroller || !width) return

      const raw = Math.round(scroller.scrollLeft / width)
      scrollToRaw(raw + 1)
    }, AUTO_ROTATE_MS)

    return () => window.clearInterval(timer)
  }, [activeSlide, isPaused, stride])

  const slideNodes = Array.from({ length: LOOP_SETS * SLIDE_COUNT }, (_, index) => {
    const logical = logicalIndex(index)
    return (
      <div
        key={`${SLIDES[logical].id}-${index}`}
        className="w-full shrink-0 snap-start snap-always"
      >
        {logical === 0 ? <EducationSlide /> : <SkillsSlide />}
      </div>
    )
  })

  return (
    <div
      className="min-w-0"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div
        ref={scrollerRef}
        className="relative snap-x snap-mandatory overflow-x-auto overflow-y-hidden overscroll-x-contain scrollbar-none touch-pan-x"
      >
        <div className="flex gap-4 sm:gap-8">{slideNodes}</div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-3">
        {SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => goToSlide(index)}
            aria-label={`Show ${slide.label}`}
            className={`rounded-full transition-all duration-500 ${
              activeSlide === index
                ? 'h-2.5 w-2.5 bg-accent'
                : 'h-2.5 w-2.5 bg-text-muted/40 hover:bg-text-muted/70 sm:h-1.5 sm:w-1.5'
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
      <h3 className="mb-4 text-lg font-semibold text-text">
        {aboutMe.educationTitle}
      </h3>
      <div className="space-y-4">
        {aboutMe.education.map((edu) => (
          <Card key={`${edu.schoolName}-${edu.course}`}>
            <h4 className="font-semibold">{edu.schoolName}</h4>
            <p className="text-sm text-text-muted">{edu.course}</p>
            {(edu.startDate || edu.endDate) && (
              <p className="mt-1 text-xs text-text-muted">
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
      <h3 className="mb-4 text-lg font-semibold text-text">
        {aboutMe.skillsTitle}
      </h3>
      <div className="flex flex-wrap gap-2">
        {profile.skills.map((skill) => (
          <span
            key={skill.name}
            className="rounded-full bg-text/10 px-3.5 py-1.5 text-sm text-text-muted"
          >
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  )
}
