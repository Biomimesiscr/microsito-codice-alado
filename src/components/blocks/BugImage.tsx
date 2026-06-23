import { useState } from 'react'

interface Props {
  src: string
  size: number
  alt?: string
}

export function BugImage({ src, size, alt = '' }: Props) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        className="flex items-center justify-center rounded-full border border-dashed border-gray-400 bg-gray-100 text-[10px] text-gray-400"
        style={{ width: size, height: size }}
        aria-label={alt || 'imagen no disponible'}
      >
        {alt || 'IMG'}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className="object-contain"
      onError={() => setFailed(true)}
    />
  )
}
