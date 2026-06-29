import { useRef } from 'react'
import type { ReactNode } from 'react'
import { useInfography } from './useInfography'

interface Props {
  x: number | string
  y: number | string
  itemLayers: number[]
  zoomable?: boolean
  focusZoom?: number
  navigateTo?: number
  children: ReactNode
}

export function InfographySlot({
  x,
  y,
  itemLayers,
  zoomable,
  focusZoom,
  navigateTo,
  children,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { currentLayer, goToLayer, focusElement, resetFocus } = useInfography()

  const visible = itemLayers.includes(currentLayer)
  const rep = Math.min(...itemLayers)
  const direction = rep < currentLayer ? 1 : -1

  const xStyle = typeof x === 'number' ? `${x}px` : x
  const yStyle = typeof y === 'number' ? `${y}px` : y
  const centeredX = typeof x === 'string' && x.includes('%')
  const posTransform = centeredX ? 'translateX(-50%)' : undefined

  const navigates = navigateTo !== undefined
  const interactive = visible && (zoomable || navigates)

  const navigate = () => {
    if (navigates) goToLayer(navigateTo)
  }

  return (
    <div
      ref={ref}
      className="absolute"
      style={{
        left: xStyle,
        top: yStyle,
        transform: posTransform,
        pointerEvents: visible ? 'auto' : 'none',
        cursor: interactive ? 'pointer' : 'default',
      }}
      tabIndex={interactive ? 0 : -1}
      onMouseEnter={
        zoomable && visible
          ? () => ref.current && focusElement(ref.current, centeredX, focusZoom)
          : undefined
      }
      onMouseLeave={zoomable && visible ? resetFocus : undefined}
      onClick={
        navigates
          ? e => {
              e.stopPropagation()
              navigate()
            }
          : undefined
      }
      onKeyDown={
        navigates
          ? e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                navigate()
              }
            }
          : undefined
      }
    >
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1)' : `scale(${1 + direction * 0.04})`,
          transition: 'opacity 0.45s ease, transform 0.45s ease',
        }}
      >
        {children}
      </div>
    </div>
  )
}
