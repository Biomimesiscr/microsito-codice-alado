export interface ArrowIconProps {
  className?: string;
}

/**
 * Flecha larga y delgada del diseño (`108:639`), viñeta de `ArrowList` y
 * control del carrusel. El archivo trae un `fill` fijo, así que se pinta
 * como máscara + `currentColor` (mismo truco que `Decor.tsx`) para heredar
 * `text-fg` / `text-accent` en vez de quedar atado al color del SVG.
 *
 * Aspect ratio real del asset: 19.2874 / 5.7465 ≈ 3.36 : 1.
 */
export function ArrowIcon({ className = "" }: ArrowIconProps) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block bg-current ${className}`.trim()}
      style={{
        maskImage: "url(/icons/arrow-right.svg)",
        WebkitMaskImage: "url(/icons/arrow-right.svg)",
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  );
}

export default ArrowIcon;
