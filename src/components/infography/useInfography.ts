import { createContext, useContext } from 'react'

interface InfographyContextValue {
  currentLayer: number
  /** Navega a la capa indicada (con clamp a rango válido). */
  goToLayer: (layer: number) => void
  /**
   * Aplica zoom hacia el elemento usando transform-origin (no desplaza el slot).
   * centeredX indica si el slot usa translateX(-50%) para centrarse.
   */
  focusElement: (el: HTMLElement, centeredX: boolean, focusZoom?: number) => void
  resetFocus: () => void
}

export const InfographyContext = createContext<InfographyContextValue>({
  currentLayer: 0,
  goToLayer: () => {},
  focusElement: () => {},
  resetFocus: () => {},
})

export const useInfography = () => useContext(InfographyContext)
