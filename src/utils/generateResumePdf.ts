import { jsPDF } from 'jspdf'
import { experience } from '../data/experience'
import { profile } from '../data/profile'
import { resume } from '../data/resume'
import type { ExperienceProject } from '../data/interface'

const MARGIN_X = 18
const PAGE_WIDTH = 210
const PAGE_HEIGHT = 297
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_X * 2
const BOTTOM_LIMIT = PAGE_HEIGHT - 16
const PAGE_TOP = 18
const PROJECT_INDENT = 4

/** Timeline gutter for Professional Experience */
const TIMELINE_X = MARGIN_X + 1.5
const TIMELINE_GUTTER = 8
const EXP_X = MARGIN_X + TIMELINE_GUTTER
const EXP_WIDTH = CONTENT_WIDTH - TIMELINE_GUTTER

const COLORS = {
  text: [28, 28, 30] as [number, number, number],
  muted: [90, 90, 95] as [number, number, number],
  line: [200, 200, 205] as [number, number, number],
  accent: [40, 40, 45] as [number, number, number],
  timeline: [120, 120, 128] as [number, number, number],
}

type TimelineCtx = {
  cursorY: number | null
}

function setColor(doc: jsPDF, rgb: [number, number, number]) {
  doc.setTextColor(rgb[0], rgb[1], rgb[2])
}

function strokeTimeline(doc: jsPDF, fromY: number, toY: number) {
  if (toY <= fromY) return
  doc.setDrawColor(...COLORS.timeline)
  doc.setLineWidth(0.55)
  doc.line(TIMELINE_X, fromY, TIMELINE_X, toY)
}

function drawTimelineDot(doc: jsPDF, y: number) {
  const r = 1.35
  doc.setFillColor(255, 255, 255)
  doc.circle(TIMELINE_X, y, r + 0.35, 'F')
  doc.setFillColor(...COLORS.accent)
  doc.circle(TIMELINE_X, y, r, 'F')
}

function extendTimeline(doc: jsPDF, timeline: TimelineCtx, toY: number) {
  if (timeline.cursorY === null) {
    timeline.cursorY = toY
    return
  }
  strokeTimeline(doc, timeline.cursorY, toY)
  timeline.cursorY = toY
}

function ensureSpace(
  doc: jsPDF,
  y: number,
  needed: number,
  timeline?: TimelineCtx,
): number {
  if (y + needed <= BOTTOM_LIMIT) return y
  if (timeline && timeline.cursorY !== null) {
    strokeTimeline(doc, timeline.cursorY, BOTTOM_LIMIT)
  }
  doc.addPage()
  if (timeline) timeline.cursorY = PAGE_TOP
  return PAGE_TOP
}

function drawSectionTitle(doc: jsPDF, title: string, y: number): number {
  y = ensureSpace(doc, y, 12)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  setColor(doc, COLORS.accent)
  doc.text(title.toUpperCase(), MARGIN_X, y)
  y += 2
  doc.setDrawColor(...COLORS.line)
  doc.setLineWidth(0.4)
  doc.line(MARGIN_X, y, MARGIN_X + CONTENT_WIDTH, y)
  return y + 6
}

function wrapText(
  doc: jsPDF,
  text: string,
  maxWidth: number,
  fontSize: number,
  style: 'normal' | 'bold' | 'italic' = 'normal',
): string[] {
  doc.setFont('helvetica', style)
  doc.setFontSize(fontSize)
  return doc.splitTextToSize(text, maxWidth)
}

function linkedInDisplayName(url?: string): string | null {
  if (!url) return null
  const match = url.match(/linkedin\.com\/in\/([^/?#]+)/i)
  if (!match) return 'LinkedIn'
  const parts = match[1].split('-').filter(Boolean)
  while (parts.length > 1 && /^[a-z0-9]*\d[a-z0-9]*$/i.test(parts[parts.length - 1]!)) {
    parts.pop()
  }
  return parts
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function githubDisplayName(url?: string): string | null {
  if (!url) return null
  const match = url.match(/github\.com\/([^/?#]+)/i)
  return match ? match[1] : 'GitHub'
}

function drawMultilineBody(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  fontSize: number,
  timeline?: TimelineCtx,
): number {
  const paragraphs = text.split('\n')

  for (const paragraph of paragraphs) {
    if (paragraph.trim() === '') {
      y += 2
      if (timeline) extendTimeline(doc, timeline, y)
      continue
    }
    const lines = wrapText(doc, paragraph, maxWidth, fontSize)
    const lineHeight = fontSize * 0.45
    y = ensureSpace(doc, y, lines.length * lineHeight + 1, timeline)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(fontSize)
    setColor(doc, COLORS.text)
    doc.text(lines, x, y)
    y += lines.length * lineHeight + 0.8
    if (timeline) extendTimeline(doc, timeline, y)
  }

  return y
}

function drawProject(
  doc: jsPDF,
  project: ExperienceProject,
  y: number,
  contentX: number,
  contentWidth: number,
  timeline?: TimelineCtx,
): number {
  const x = contentX + PROJECT_INDENT
  const width = contentWidth - PROJECT_INDENT

  y = ensureSpace(doc, y, 12, timeline)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  setColor(doc, COLORS.text)
  const titleLines = wrapText(doc, project.title, width, 9, 'bold')
  doc.text(titleLines, x, y)
  y += titleLines.length * 4
  if (timeline) extendTimeline(doc, timeline, y)

  if (project.role) {
    y = ensureSpace(doc, y, 5, timeline)
    doc.setFont('helvetica', 'italic')
    doc.setFontSize(8)
    setColor(doc, COLORS.muted)
    const roleLines = wrapText(doc, project.role, width, 8, 'italic')
    doc.text(roleLines, x, y)
    y += roleLines.length * 3.6 + 1
    if (timeline) extendTimeline(doc, timeline, y)
  }

  if (project.description) {
    y = drawMultilineBody(
      doc,
      project.description,
      x,
      y,
      width,
      8.5,
      timeline,
    )
  }

  if (project.techUsed && project.techUsed.length > 0) {
    const techLine = `Tech: ${project.techUsed.join(', ')}`
    const techLines = wrapText(doc, techLine, width, 7.5)
    y = ensureSpace(doc, y, techLines.length * 3.4 + 1, timeline)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7.5)
    setColor(doc, COLORS.muted)
    doc.text(techLines, x, y)
    y += techLines.length * 3.4
    if (timeline) extendTimeline(doc, timeline, y)
  }

  return y + 3.5
}

export function generateResumePdf(): void {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  let y = 18

  // Header (centered)
  const centerX = PAGE_WIDTH / 2

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(20)
  setColor(doc, COLORS.text)
  doc.text(resume.name.toUpperCase(), centerX, y, { align: 'center' })
  y += 7

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  setColor(doc, COLORS.muted)
  doc.text(profile.currentPosition, centerX, y, { align: 'center' })
  y += 5

  const contactLines: string[] = []
  if (profile.address) contactLines.push(profile.address)
  if (profile.email) contactLines.push(profile.email)
  if (profile.phone) contactLines.push(profile.phone)

  const linkedInName = linkedInDisplayName(profile.socials.linkedin)
  if (linkedInName) contactLines.push(`LinkedIn: ${linkedInName}`)

  const githubName = githubDisplayName(profile.socials.github)
  if (githubName) contactLines.push(`Github: ${githubName}`)

  if (contactLines.length > 0) {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    setColor(doc, COLORS.muted)
    for (const line of contactLines) {
      doc.text(line, centerX, y, { align: 'center' })
      y += 3.6
    }
    y += 3
  }

  doc.setDrawColor(...COLORS.line)
  doc.setLineWidth(0.5)
  doc.line(MARGIN_X, y, MARGIN_X + CONTENT_WIDTH, y)
  y += 8

  // Profile
  y = drawSectionTitle(doc, 'Profile', y)
  const profileLines = wrapText(doc, resume.profile, CONTENT_WIDTH, 9)
  y = ensureSpace(doc, y, profileLines.length * 4 + 2)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  setColor(doc, COLORS.text)
  doc.text(profileLines, MARGIN_X, y)
  y += profileLines.length * 4 + 6

  // Core Skills
  y = drawSectionTitle(doc, 'Core Skills', y)
  for (const group of resume.coreSkills) {
    y = ensureSpace(doc, y, 8)

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    setColor(doc, COLORS.text)
    doc.text(group.category, MARGIN_X, y)
    y += 4

    const skillLines = wrapText(doc, group.skills.join('  ·  '), CONTENT_WIDTH, 8.5)
    y = ensureSpace(doc, y, skillLines.length * 3.8 + 2)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8.5)
    setColor(doc, COLORS.muted)
    doc.text(skillLines, MARGIN_X, y)
    y += skillLines.length * 3.8 + 3
  }
  y += 2

  // Professional Experience (most recent first) — timeline on the left
  y = drawSectionTitle(doc, 'Professional Experience', y)
  const jobs = [...experience.items].reverse()
  const timeline: TimelineCtx = { cursorY: null }

  for (const job of jobs) {
    const dateRange = [job.startDate, job.endDate].filter(Boolean).join(' – ')
    y = ensureSpace(doc, y, 14, timeline)

    // Marker at the start of each role
    const markerY = y - 1.2
    if (timeline.cursorY !== null) {
      extendTimeline(doc, timeline, markerY)
    } else {
      timeline.cursorY = markerY
    }
    drawTimelineDot(doc, markerY)

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    setColor(doc, COLORS.text)
    const roleLines = wrapText(doc, job.role || job.title, EXP_WIDTH - 38, 10, 'bold')
    doc.text(roleLines, EXP_X, y)

    if (dateRange) {
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8)
      setColor(doc, COLORS.muted)
      const dateWidth = doc.getTextWidth(dateRange)
      doc.text(dateRange, EXP_X + EXP_WIDTH - dateWidth, y)
    }
    y += Math.max(roleLines.length * 4.5, 4.5)
    extendTimeline(doc, timeline, y)

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    setColor(doc, COLORS.text)
    doc.text(job.companyName, EXP_X, y)
    y += 4
    extendTimeline(doc, timeline, y)

    if (job.projectName) {
      doc.setFont('helvetica', 'italic')
      doc.setFontSize(8.5)
      setColor(doc, COLORS.muted)
      doc.text(job.projectName, EXP_X, y)
      y += 4
      extendTimeline(doc, timeline, y)
    }

    y = drawMultilineBody(
      doc,
      job.description,
      EXP_X,
      y,
      EXP_WIDTH,
      9,
      timeline,
    )

    if (job.techUsed.length > 0) {
      const techLine = `Tech: ${job.techUsed.join(', ')}`
      const techLines = wrapText(doc, techLine, EXP_WIDTH, 8)
      y = ensureSpace(doc, y, techLines.length * 3.6 + 2, timeline)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8)
      setColor(doc, COLORS.muted)
      doc.text(techLines, EXP_X, y)
      y += techLines.length * 3.6 + 2
      extendTimeline(doc, timeline, y)
    }

    if (job.projects && job.projects.length > 0) {
      y = ensureSpace(doc, y, 8, timeline)
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(8.5)
      setColor(doc, COLORS.accent)
      doc.text('Projects', EXP_X, y)
      y += 4.5
      extendTimeline(doc, timeline, y)

      for (const project of job.projects) {
        y = drawProject(doc, project, y, EXP_X, EXP_WIDTH, timeline)
        extendTimeline(doc, timeline, y)
      }
    }

    y += 4
    extendTimeline(doc, timeline, y)
  }

  // Education
  if (profile.education.length > 0) {
    y = drawSectionTitle(doc, 'Education', y)
    for (const edu of profile.education) {
      const dateRange = [edu.startDate, edu.endDate].filter(Boolean).join(' – ')
      y = ensureSpace(doc, y, 12)

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(9.5)
      setColor(doc, COLORS.text)
      doc.text(edu.schoolName, MARGIN_X, y)

      if (dateRange) {
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(8)
        setColor(doc, COLORS.muted)
        const dateWidth = doc.getTextWidth(dateRange)
        doc.text(dateRange, MARGIN_X + CONTENT_WIDTH - dateWidth, y)
      }
      y += 4

      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      setColor(doc, COLORS.muted)
      doc.text(edu.course, MARGIN_X, y)
      y += 6
    }
  }

  doc.save(resume.fileName)
}
