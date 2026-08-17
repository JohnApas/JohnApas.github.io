interface SectionTitleProps {
  title: string
  subtitle?: string
}

export function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-8 px-1 text-center sm:mb-10 md:mb-16">
      <h2 className="text-[1.75rem] leading-tight font-semibold tracking-tight text-pretty text-text sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed font-normal text-pretty text-text-muted sm:mt-4 sm:text-lg md:text-xl">
          {subtitle}
        </p>
      )}
    </div>
  )
}
