import { createContext, useContext } from 'react'

interface InfographyContextValue {
  currentLayer: number
  /** Id del slot actualmente enfocado, o null si ninguno. */
  focusedId: string | null
  /** Aplica el efecto focus al elemento, con el zoom indicado (default 1.18). */
  focusElement: (el: HTMLElement, id: string, focusZoom?: number) => void
  resetFocus: () => void
}

export const InfographyContext = createContext<InfographyContextValue>({
  currentLayer: 0,
  focusedId: null,
  focusElement: () => {},
  resetFocus: () => {},
})

export const useInfography = () => useContext(InfographyContext)
