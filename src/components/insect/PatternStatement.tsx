import type { ReactNode } from "react";

export interface PatternStatementProps {
  /** Colores reales del patrón del insecto (dato biológico, no de marca). */
  colors: string[];
  children: ReactNode;
  /** Texto resaltado dentro de `children`, p. ej. "BOB". Solo se aplica si
   * `children` es un string plano; con contenido más rico, el llamador ya
   * decide qué resaltar. */
  highlight?: string;
  /** Pie del enunciado. En el mockup va *entre* las dos reglas, no debajo. */
  caption?: ReactNode;
}

/** Envuelve la primera aparición de `highlight` dentro de `text` en un span
 * con el color de acento. Sin coincidencia, devuelve el texto tal cual. */
function withHighlight(text: string, highlight: string): ReactNode {
  const index = text.indexOf(highlight);
  if (index === -1) return text;
  return (
    <>
      {text.slice(0, index)}
      <strong className="font-bold text-accent">{highlight}</strong>
      {text.slice(index + highlight.length)}
    </>
  );
}

/**
 * Regla tricolor (o de N colores) arriba y abajo de un texto centrado.
 * Genérico a propósito: no asume 3 colores ni BOB, cualquier especie con un
 * patrón de color documentado puede reutilizarlo.
 */
export function PatternStatement({ colors, children, highlight, caption }: PatternStatementProps) {
  const stripe = (
    <div className="flex h-[10px] w-full overflow-hidden rounded-full" aria-hidden="true">
      {colors.map((color, index) => (
        <div key={`${color}-${index}`} className="h-full flex-1" style={{ backgroundColor: color }} />
      ))}
    </div>
  );

  const content =
    typeof children === "string" && highlight ? withHighlight(children, highlight) : children;

  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
      {stripe}
      <div className="flex flex-col items-center gap-4">
        <p className="text-xl leading-relaxed text-fg md:text-2xl">{content}</p>
        {caption && <div className="text-base leading-snug text-fg-muted">{caption}</div>}
      </div>
      {stripe}
    </section>
  );
}

export default PatternStatement;
