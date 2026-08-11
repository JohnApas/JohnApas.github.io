/** Year-only values like "2019" are shown as-is. */
const YEAR_ONLY = /^\d{4}$/

/** Values like "2019-08" become "Aug 2019". */
const YEAR_MONTH = /^(\d{4})-(\d{2})$/

export function formatDate(date?: string): string {
  if (!date) return ''

  const trimmed = date.trim()

  if (YEAR_ONLY.test(trimmed) || trimmed === 'Present') {
    return trimmed
  }

  const yearMonth = trimmed.match(YEAR_MONTH)
  if (yearMonth) {
    const parsed = new Date(Number(yearMonth[1]), Number(yearMonth[2]) - 1)
    if (!Number.isNaN(parsed.getTime())) {
      return parsed.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      })
    }
  }

  const parsed = new Date(trimmed)
  if (Number.isNaN(parsed.getTime())) return trimmed

  return parsed.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })
}

function parseDate(date: string): Date | null {
  const trimmed = date.trim()

  if (trimmed === 'Present') return new Date()

  if (YEAR_ONLY.test(trimmed)) {
    return new Date(Number(trimmed), 0, 1)
  }

  const yearMonth = trimmed.match(YEAR_MONTH)
  if (yearMonth) {
    return new Date(Number(yearMonth[1]), Number(yearMonth[2]) - 1, 1)
  }

  const parsed = new Date(trimmed)
  if (Number.isNaN(parsed.getTime())) return null

  return parsed
}

export function formatStayDuration(
  startDate?: string,
  endDate?: string | 'Present',
): string {
  if (!startDate) return ''

  const start = parseDate(startDate)
  const end = parseDate(endDate === 'Present' || !endDate ? 'Present' : endDate)

  if (!start || !end || end < start) return ''

  let years = end.getFullYear() - start.getFullYear()
  let months = end.getMonth() - start.getMonth()

  if (end.getDate() < start.getDate()) {
    months -= 1
  }

  if (months < 0) {
    years -= 1
    months += 12
  }

  if (years === 0 && months === 0) {
    return 'Less than a Month'
  }

  const parts: string[] = []

  if (years > 0) {
    parts.push(`${years} ${years === 1 ? 'Year' : 'Years'}`)
  }

  if (months > 0) {
    parts.push(`${months} ${months === 1 ? 'Month' : 'Months'}`)
  }

  return parts.join(' ')
}

export function formatDateRange(
  startDate?: string,
  endDate?: string | 'Present',
): string {
  const start = formatDate(startDate)
  const end = endDate === 'Present' ? 'Present' : formatDate(endDate)

  if (!start && !end) return ''
  if (!start) return end
  if (!end) return start

  const range = `${start} - ${end}`
  const stay = formatStayDuration(startDate, endDate)

  return stay ? `${range} | ${stay}` : range
}
