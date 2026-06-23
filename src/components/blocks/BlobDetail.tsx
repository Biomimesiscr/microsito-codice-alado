import { BugImage } from './BugImage'

interface Props {
  src: string
  label: string
}

export function BlobDetail({ src, label }: Props) {
  return (
    <figure className="flex flex-col items-center gap-1">
      <div className="overflow-hidden rounded-full border border-gray-300 bg-white/60 p-1">
        <BugImage src={src} size={64} alt={label} />
      </div>
      <figcaption className="text-[10px] font-medium text-gray-500">{label}</figcaption>
    </figure>
  )
}
