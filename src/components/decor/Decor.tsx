import type { CSSProperties } from "react";

export interface DecorSlot {
  /**
   * Ruta al SVG. Se usa como máscara, no como imagen: los colores internos del
   * archivo son irrelevantes, solo cuenta su alfa. Cualquier SVG (silueta o
   * line art) se puede sustituir aquí sin tocar el resto del código.
   */
  src: string;
  /** Posición, tamaño y color del hueco. El color va por `text-*`. */
  className?: string;
  style?: CSSProperties;
}

export function Decor({ src, className = "", style }: DecorSlot) {
  const maskStyles: CSSProperties = {
    maskImage: `url(${src})`,
    WebkitMaskImage: `url(${src})`,
    maskSize: "contain",
    WebkitMaskSize: "contain",
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskPosition: "center",
    WebkitMaskPosition: "center",
    backgroundColor: "currentColor",
    ...style,
  };

  return (
    <span
      aria-hidden="true"
      className={`absolute pointer-events-none select-none ${className}`.trim()}
      style={maskStyles}
    />
  );
}

export default Decor;
