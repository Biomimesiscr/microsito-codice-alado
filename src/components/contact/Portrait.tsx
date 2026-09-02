import { useState } from "react";

export interface PortraitProps {
  src: string;
  alt: string;
  size?: number;
  /**
   * Clases de dimensionado. Si se pasa, sustituye al tamaño fijo en píxeles:
   * `size` seguiría ganando por ir en `style` inline, así que son excluyentes.
   * Es la vía para tamaños responsivos, que no caben en un número.
   */
  className?: string;
}

/**
 * Retrato circular. Sigue el patrón de `BugImage`: si la foto no existe todavía
 * cae a un placeholder con aspecto intencionado, así que basta con subir el
 * archivo a `public/team/` para que aparezca la foto real sin tocar código.
 */
export function Portrait({ src, alt, size = 176, className }: PortraitProps) {
  const [failed, setFailed] = useState(false);
  const sizing = className ? undefined : { width: size, height: size };

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center rounded-full bg-surface-raised text-fg-subtle ${className ?? ""}`.trim()}
        style={sizing}
        role="img"
        aria-label={alt}
      >
        <svg
          width={size * 0.45}
          height={size * 0.45}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
        </svg>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      style={sizing}
      className={`rounded-full object-cover ${className ?? ""}`.trim()}
      onError={() => setFailed(true)}
    />
  );
}

export default Portrait;
