import { createContext, useContext } from 'react'

interface InfographyContextValue {
  currentLayer: number
  /** Aplica el efecto focus al elemento, con el zoom indicado (default 1.18). */
  focusElement: (el: HTMLElement, focusZoom?: number) => void
  resetFocus: () => void
}

export const InfographyContext = createContext<InfographyContextValue>({
  currentLayer: 0,
  focusElement: () => {},
  resetFocus: () => {},
})

export const useInfography = () => useContext(InfographyContext)
