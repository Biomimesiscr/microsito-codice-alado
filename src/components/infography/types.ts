import type { ReactNode } from 'react'

export interface LayerItem {
  /** Nivel de zoom en que este slot es visible (0, 1, 2...) */
  layer: number

  /** Posición horizontal: número = px absoluto, string = CSS (ej. "50%") */
  x: number | string

  /** Posición vertical: número = px absoluto, string = CSS (ej. "50%") */
  y: number | string

  /**
   * Zoom aplicado al hacer hover sobre este slot.
   * Default: 1.18
   */
  focusZoom?: number

  /** Componente React a renderizar en esta posición */
  component: ReactNode
}

export interface InfographyCanvasProps {
  layers: LayerItem[]
  /** Altura del canvas en px. Default: 420 */
  height?: number
  /** Etiquetas de zoom para cada nivel. Default: ["%95", "%120", "%125"] */
  zoomLabels?: string[]
}
