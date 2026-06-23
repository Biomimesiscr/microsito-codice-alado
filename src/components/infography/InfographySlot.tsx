import { useRef } from 'react'
import type { ReactNode } from 'react'
import { useInfography } from './useInfography'

interface Props {
  id: string
  x: number | string
  y: number | string
  focusZoom?: number
  children: ReactNode
}

export function InfographySlot({ id, x, y, focusZoom, children }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { focusedId, focusElement, resetFocus } = useInfography()

  const xStyle = typeof x === 'number' ? `${x}px` : x
  const yStyle = typeof y === 'number' ? `${y}px` : y
  const transform =
    typeof x === 'string' && x.includes('%') ? 'translateX(-50%)' : undefined

  const toggle = () => {
    if (!ref.current) return
    if (focusedId === id) resetFocus()
    else focusElement(ref.current, id, focusZoom)
  }

  return (
    <div
      ref={ref}
      className="absolute cursor-pointer"
      style={{ left: xStyle, top: yStyle, transform }}
      tabIndex={0}
      onClick={e => {
        e.stopPropagation()
        toggle()
      }}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          toggle()
        }
      }}
    >
      {children}
    </div>
  )
}
