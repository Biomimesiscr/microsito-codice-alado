import type { ReactNode } from 'react'

interface Props {
  maxWidth?: number
  children: ReactNode
}

export function BodyText({ maxWidth = 340, children }: Props) {
  return (
    <p
      className="text-center text-sm leading-relaxed text-gray-700"
      style={{ maxWidth }}
    >
      {children}
    </p>
  )
}
