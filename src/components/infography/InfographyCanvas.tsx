import { useState, useRef, useCallback } from 'react'
import { InfographyContext } from './useInfography'
import { InfographyLayer } from './InfographyLayer'
import { InfographySlot } from './InfographySlot'
import { ZoomController } from './ZoomController'
import type { InfographyCanvasProps } from './types'

const FOCUS_ZOOM = 1.18
const TRANSITION = '0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'

export function InfographyCanvas({
  layers,
  height = 420,
  zoomLabels,
}: InfographyCanvasProps) {
  const [currentLayer, setCurrentLayer] = useState(0)
  const [focusedId, setFocusedId] = useState<string | null>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const totalLayers = Math.max(...layers.map(l => l.layer)) + 1
  const labels =
    zoomLabels ?? Array.from({ length: totalLayers }, (_, i) => `%${95 + i * 25}`)

  const changeLayer = useCallback(
    (delta: number) => {
      setCurrentLayer(prev => Math.max(0, Math.min(totalLayers - 1, prev + delta)))
    },
    [totalLayers],
  )

  const focusElement = useCallback(
    (el: HTMLElement, id: string, focusZoom = FOCUS_ZOOM) => {
      const wrap = wrapRef.current
      const scene = sceneRef.current
      if (!wrap || !scene) return
      const wR = wrap.getBoundingClientRect()
      const eR = el.getBoundingClientRect()
      const ex = eR.left + eR.width / 2 - wR.left
      const ey = eR.top + eR.height / 2 - wR.top
      const tx = (wR.width / 2 - ex) + (wR.width / 2 - ex) * (focusZoom - 1) / focusZoom
      const ty = (wR.height / 2 - ey) + (wR.height / 2 - ey) * (focusZoom - 1) / focusZoom
      scene.style.transform = `translate(${tx}px, ${ty}px) scale(${focusZoom})`
      setFocusedId(id)
    },
    [],
  )

  const resetFocus = useCallback(() => {
    if (sceneRef.current) sceneRef.current.style.transform = 'translate(0,0) scale(1)'
    setFocusedId(null)
  }, [])

  return (
    <InfographyContext.Provider value={{ currentLayer, focusedId, focusElement, resetFocus }}>
      <div
        ref={wrapRef}
        className="relative overflow-hidden cursor-ns-resize"
        style={{ height }}
        onWheel={e => {
          e.preventDefault()
          changeLayer(e.deltaY > 0 ? 1 : -1)
        }}
        onClick={resetFocus}
      >
        <div
          ref={sceneRef}
          className="relative w-full h-full"
          style={{ transition: TRANSITION, willChange: 'transform' }}
        >
          {Array.from({ length: totalLayers }, (_, i) => (
            <InfographyLayer key={i} layerIndex={i}>
              {layers
                .filter(item => item.layer === i)
                .map((item, j) => (
                  <InfographySlot
                    key={j}
                    id={`${i}-${j}`}
                    x={item.x}
                    y={item.y}
                    focusZoom={item.focusZoom}
                  >
                    {item.component}
                  </InfographySlot>
                ))}
            </InfographyLayer>
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
