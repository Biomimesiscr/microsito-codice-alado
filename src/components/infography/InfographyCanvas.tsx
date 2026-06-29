import { useState, useRef, useCallback } from 'react'
import { InfographyContext } from './useInfography'
import { InfographySlot } from './InfographySlot'
import { ZoomController } from './ZoomController'
import type { InfographyCanvasProps } from './types'

const FOCUS_ZOOM = 1.18
const TRANSITION = '0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'

const toLayers = (layer: number | number[]) =>
  Array.isArray(layer) ? layer : [layer]

export function InfographyCanvas({
  layers,
  height = 420,
  zoomLabels,
}: InfographyCanvasProps) {
  const [currentLayer, setCurrentLayer] = useState(0)
  const sceneRef = useRef<HTMLDivElement>(null)

  const totalLayers = Math.max(...layers.flatMap(l => toLayers(l.layer))) + 1
  const labels =
    zoomLabels ?? Array.from({ length: totalLayers }, (_, i) => `%${95 + i * 25}`)

  const resetFocus = useCallback(() => {
    if (sceneRef.current) sceneRef.current.style.transform = 'scale(1)'
  }, [])

  const goToLayer = useCallback(
    (layer: number) => {
      resetFocus()
      setCurrentLayer(Math.max(0, Math.min(totalLayers - 1, layer)))
    },
    [totalLayers, resetFocus],
  )

  const changeLayer = useCallback(
    (delta: number) => goToLayer(currentLayer + delta),
    [currentLayer, goToLayer],
  )

  const focusElement = useCallback(
    (el: HTMLElement, centeredX: boolean, focusZoom = FOCUS_ZOOM) => {
      const scene = sceneRef.current
      if (!scene) return
      // Centro del slot en coordenadas (sin transformar) del scene.
      // offsetLeft/Top ignoran transforms, por eso son estables aunque el scene esté escalado.
      const cx = centeredX ? el.offsetLeft : el.offsetLeft + el.offsetWidth / 2
      const cy = el.offsetTop + el.offsetHeight / 2
      scene.style.transformOrigin = `${cx}px ${cy}px`
      scene.style.transform = `scale(${focusZoom})`
    },
    [],
  )

  return (
    <InfographyContext.Provider
      value={{ currentLayer, goToLayer, focusElement, resetFocus }}
    >
      <div
        className="relative overflow-hidden cursor-ns-resize"
        style={{ height }}
        onWheel={e => {
          e.preventDefault()
          changeLayer(e.deltaY > 0 ? 1 : -1)
        }}
      >
        <div
          ref={sceneRef}
          className="relative w-full h-full"
          style={{ transition: TRANSITION, willChange: 'transform' }}
        >
          {layers.map((item, idx) => (
            <InfographySlot
              key={idx}
              x={item.x}
              y={item.y}
              itemLayers={toLayers(item.layer)}
              zoomable={item.zoomable}
              focusZoom={item.focusZoom}
              navigateTo={item.navigateTo}
            >
              {item.component}
            </InfographySlot>
          ))}
        </div>
        <ZoomController
          current={currentLayer}
          total={totalLayers}
          labels={labels}
          onChange={changeLayer}
        />
      </div>
    </InfographyContext.Provider>
  )
}
