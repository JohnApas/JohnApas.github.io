import { profile } from '../../data/profile'
import type { SkillCategory } from '../../data/interface'
import { Card } from '../common/Card'
import { SectionTitle } from '../common/SectionTitle'

const categoryLabels: Record<SkillCategory, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  tools: 'Tools',
  other: 'Other',
}

const categoryOrder: SkillCategory[] = [
  'frontend',
  'backend',
  'database',
  'tools',
  'other',
]

function groupSkillsByCategory() {
  const grouped = new Map<SkillCategory | 'uncategorized', typeof profile.skills>()

  for (const skill of profile.skills) {
    const key = skill.category ?? 'uncategorized'
    const existing = grouped.get(key) ?? []
    grouped.set(key, [...existing, skill])
  }

  return grouped
}

export function Skills() {
  const grouped = groupSkillsByCategory()

  const categorizedGroups = categoryOrder
    .filter((cat) => grouped.has(cat))
    .map((cat) => ({ label: categoryLabels[cat], skills: grouped.get(cat)! }))

  const uncategorized = grouped.get('uncategorized')

  return (
    <section id="skills" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          title="Skills"
          subtitle="Technologies I navigate through the cosmos"
        />

        <div className="space-y-10">
          {categorizedGroups.map((group) => (
            <div key={group.label}>
              <h3 className="mb-4 text-lg font-semibold text-highlight">
                {group.label}
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.skills.map((skill) => (
                  <SkillCard key={skill.name} name={skill.name} proficiency={skill.proficiency} />
                ))}
              </div>
            </div>
          ))}

          {uncategorized && uncategorized.length > 0 && (
            <div>
              <h3 className="mb-4 text-lg font-semibold text-highlight">
                Skills
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {uncategorized.map((skill) => (
                  <SkillCard key={skill.name} name={skill.name} proficiency={skill.proficiency} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function SkillCard({
  name,
  proficiency,
}: {
  name: string
  proficiency?: number
}) {
  return (
    <Card className="flex items-center gap-4">
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-highlight text-xs font-bold text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]"
        style={
          proficiency
            ? { opacity: 0.5 + (proficiency / 100) * 0.5 }
            : undefined
        }
      >
        {proficiency ? `${proficiency}%` : name[0]}
      </div>
      <div className="flex-1">
        <p className="font-medium">{name}</p>
        {proficiency !== undefined && (
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent to-highlight transition-all duration-500"
              style={{ width: `${proficiency}%` }}
            />
          </div>
        )}
      </div>
    </Card>
  )
}
