interface SectionTitleProps {
  title: string
  subtitle?: string
}

export function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-12 text-center">
      <h2 className="bg-gradient-to-r from-accent via-highlight to-accent bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-text-muted">{subtitle}</p>
      )}
      <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent" />
    </div>
  )
}
