interface Props {
  current: number
  total: number
  labels: string[]
  onChange: (delta: number) => void
}

export function ZoomController({ current, total, labels, onChange }: Props) {
  return (
    <div className="absolute top-3 right-3 z-10 flex items-center overflow-hidden rounded-md border-[0.5px] border-gray-300 bg-white/90">
      <button
        onClick={() => onChange(-1)}
        disabled={current === 0}
        aria-label="Reducir zoom"
        className="h-6.5 w-7 cursor-pointer border-none bg-transparent text-[15px] disabled:cursor-default disabled:opacity-40"
      >
        −
      </button>
      <span className="min-w-10.5 px-1.5 text-center text-[11px] font-medium">
        {labels[current]}
      </span>
      <button
        onClick={() => onChange(1)}
        disabled={current === total - 1}
        aria-label="Aumentar zoom"
        className="h-6.5 w-7 cursor-pointer border-none bg-transparent text-[15px] disabled:cursor-default disabled:opacity-40"
      >
        +
      </button>
    </div>
  )
}
