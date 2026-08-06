import type { ReactNode } from "react";
import { Decor, type DecorSlot } from "../decor/Decor";

export type SurfaceTone = "cream" | "olive";

export interface SurfaceProps {
  /** Determina la paleta del subárbol vía `[data-surface]` en index.css. */
  tone?: SurfaceTone;
  /** Ilustraciones decorativas de fondo. */
  decor?: DecorSlot[];
  /**
   * Permite que la página crezca más allá del viewport. Se usa `w-full` y no
   * `w-screen` porque `100vw` incluye el ancho de la barra de scroll: en cuanto
   * aparece la vertical, `w-screen` provoca scroll horizontal.
   */
  scroll?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * Shell de página. Única fuente del fondo y del color de texto base, para que
 * Layout, Menu e InfographyLayout no repliquen el mismo markup.
 */
export function Surface({
  tone = "cream",
  decor,
  scroll = false,
  className = "",
  children,
}: SurfaceProps) {
  // `overflow-x-hidden` en modo scroll: el decorado usa insets negativos para
  // sangrar fuera del viewport, y sin recorte horizontal eso genera scroll
  // lateral. El vertical se mantiene porque la altura es automática.
  const sizing = scroll
    ? "w-full min-h-screen overflow-x-hidden"
    : "w-screen h-screen overflow-hidden";

  return (
    <main
      data-surface={tone}
      className={`relative ${sizing} bg-surface text-fg font-sans ${className}`.trim()}
    >
      {decor?.map((slot) => (
        <Decor key={`${slot.src}-${slot.className ?? ""}`} {...slot} />
      ))}
      {children}
    </main>
  );
}

export default Surface;
