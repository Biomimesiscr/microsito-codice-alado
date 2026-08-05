import type { ReactNode } from "react";
import { Decor, type DecorSlot } from "../decor/Decor";

export type SurfaceTone = "cream" | "olive";

export interface SurfaceProps {
  /** Determina la paleta del subárbol vía `[data-surface]` en index.css. */
  tone?: SurfaceTone;
  /** Ilustraciones decorativas de fondo. */
  decor?: DecorSlot[];
  className?: string;
  children: ReactNode;
}

/**
 * Shell de página. Única fuente del fondo y del color de texto base, para que
 * Layout, Menu e InfographyLayout no repliquen el mismo markup.
 */
export function Surface({ tone = "cream", decor, className = "", children }: SurfaceProps) {
  return (
    <main
      data-surface={tone}
      className={`relative w-screen h-screen overflow-hidden bg-surface text-fg font-sans ${className}`.trim()}
    >
      {decor?.map((slot) => (
        <Decor key={`${slot.src}-${slot.className ?? ""}`} {...slot} />
      ))}
      {children}
    </main>
  );
}

export default Surface;
