import type { ReactNode } from 'react'

interface Props {
  maxWidth?: number
  children: ReactNode
  textAlign?: 'left' | 'center' | 'right'
}

export function BodyText({ maxWidth = 340, children, textAlign = 'center' }: Props) {
  return (
    <p
      className={`text-${textAlign} text-sm leading-relaxed text-gray-700`}
      style={{ maxWidth }}
    >
      {children}
    </p>
  )
}
