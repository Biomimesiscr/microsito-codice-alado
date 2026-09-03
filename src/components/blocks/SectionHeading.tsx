export interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

// Mapas literales: el escáner de Tailwind no ve clases construidas por
// interpolación (ver `BodyText.tsx`).
const alignStyles = {
  left: "text-left",
  center: "text-center",
} as const;

/**
 * Título + subtítulo de sección, distinto de `SectionLabel` (etiqueta chica
 * de la infografía): aquí es el encabezado de un bloque completo de la
 * página de insecto (Género/Especie, Escalas biológicas, Sitios de colecta…).
 */
export function SectionHeading({ title, subtitle, align = "left" }: SectionHeadingProps) {
  return (
    <div className={alignStyles[align]}>
      <h2 className="text-3xl font-bold tracking-wide text-heading md:text-4xl">{title}</h2>
      {subtitle && (
        <p className="mt-2 text-xl text-fg-muted md:text-2xl">{subtitle}</p>
      )}
    </div>
  );
}

export default SectionHeading;
