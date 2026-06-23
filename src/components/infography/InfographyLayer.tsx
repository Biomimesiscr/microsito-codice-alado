import type { ReactNode } from 'react'
import { useInfography } from './useInfography'

interface Props {
  layerIndex: number
  children: ReactNode
}

export function InfographyLayer({ layerIndex, children }: Props) {
  const { currentLayer } = useInfography()
  const visible = currentLayer === layerIndex
  const direction = layerIndex < currentLayer ? 1 : -1

  return (
    <div
      className="absolute inset-0"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : `scale(${1 + direction * 0.04})`,
        transition: 'opacity 0.45s ease, transform 0.45s ease',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      {children}
    </div>
  )
}
