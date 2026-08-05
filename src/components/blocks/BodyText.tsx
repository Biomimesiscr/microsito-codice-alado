import type { ReactNode } from 'react'

interface Props {
  maxWidth?: number
  children: ReactNode
  textAlign?: 'left' | 'center' | 'right'
}

// Clases literales: el escáner de Tailwind no ve las construidas por
// interpolación, así que `text-${textAlign}` nunca se generaba.
const alignStyles = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
} as const

export function BodyText({ maxWidth = 340, children, textAlign = 'center' }: Props) {
  return (
    <p
      className={`${alignStyles[textAlign]} text-sm leading-relaxed text-fg-muted`}
      style={{ maxWidth }}
    >
      {children}
    </p>
  )
}
