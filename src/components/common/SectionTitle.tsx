interface SectionTitleProps {
  title: string
  subtitle?: string
}

export function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-10 text-center md:mb-16">
      <h2 className="text-3xl font-semibold tracking-tight text-text sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-3 max-w-2xl text-base font-normal text-text-muted sm:mt-4 sm:text-lg md:text-xl">
          {subtitle}
        </p>
      )}
    </div>
  )
}
