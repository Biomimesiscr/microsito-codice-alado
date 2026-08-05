interface Props {
  title: string
  subtitle: string
  align?: 'left' | 'right'
}

export function SectionLabel({ title, subtitle, align = 'left' }: Props) {
  return (
    <div className={align === 'right' ? 'text-right' : 'text-left'}>
      <p className="text-xs font-light uppercase tracking-widest text-fg-subtle">
        {title}
      </p>
      <p className="text-lg font-bold uppercase tracking-wide text-fg">
        {subtitle}
      </p>
    </div>
  )
}
