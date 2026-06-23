import { useRef } from 'react'
import type { ReactNode } from 'react'
import { useInfography } from './useInfography'

interface Props {
  x: number | string
  y: number | string
  focusZoom?: number
  children: ReactNode
}

export function InfographySlot({ x, y, focusZoom, children }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { focusElement, resetFocus } = useInfography()

  const xStyle = typeof x === 'number' ? `${x}px` : x
  const yStyle = typeof y === 'number' ? `${y}px` : y
  const transform =
    typeof x === 'string' && x.includes('%') ? 'translateX(-50%)' : undefined

  return (
    <div
      ref={ref}
      className="absolute"
      style={{ left: xStyle, top: yStyle, transform }}
      tabIndex={0}
      onMouseEnter={() => ref.current && focusElement(ref.current, focusZoom)}
      onMouseLeave={resetFocus}
      onFocus={() => ref.current && focusElement(ref.current, focusZoom)}
      onBlur={resetFocus}
    >
      {children}
    </div>
  )
}
