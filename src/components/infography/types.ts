import type { ReactNode } from 'react'

export interface LayerItem {
  /** Capa(s) en que el slot es visible. Un número o varios (number[]). */
  layer: number | number[]

  /** Posición horizontal: número = px absoluto, string = CSS (ej. "50%") */
  x: number | string

  /** Posición vertical: número = px absoluto, string = CSS (ej. "50%") */
  y: number | string

  /** Si true, hacer hover sobre el slot hace zoom hacia él. Default: false */
  zoomable?: boolean

  /** Zoom aplicado en hover cuando zoomable. Default: 1.18 */
  focusZoom?: number

  /** Si se define, hacer click en el slot navega a esa capa. */
  navigateTo?: number

  /** Componente React a renderizar en esta posición */
  component: ReactNode
}

export interface InfographyCanvasProps {
  layers: LayerItem[]
  /** Altura del canvas en px o CSS. Default: 420 */
  height?: number | string
  /** Etiquetas de zoom para cada nivel. Default: ["%95", "%120", "%125"] */
  zoomLabels?: string[]
}
