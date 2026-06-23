interface Props {
  title: string
  subtitle: string
  align?: 'left' | 'right'
}

export function SectionLabel({ title, subtitle, align = 'left' }: Props) {
  return (
    <div className={align === 'right' ? 'text-right' : 'text-left'}>
      <p className="text-xs font-light uppercase tracking-widest text-gray-400">
        {title}
      </p>
      <p className="text-lg font-bold uppercase tracking-wide text-gray-900">
        {subtitle}
      </p>
    </div>
  )
}
