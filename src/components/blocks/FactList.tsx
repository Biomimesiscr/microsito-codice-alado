interface Props {
  title: string
  items: string[]
}

export function FactList({ title, items }: Props) {
  return (
    <div className="max-w-[200px]">
      <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-900">
        {title}
      </h3>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i} className="flex gap-1.5 text-[11px] leading-snug text-gray-600">
            <span className="mt-[3px] h-1 w-1 shrink-0 rounded-full bg-gray-400" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
