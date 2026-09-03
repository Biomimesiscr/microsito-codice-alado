export interface IntroBandProps {
  title: string;
  body: string;
}

/**
 * Banda «¿Qué son?». Isla `data-surface="olive"` dentro de la página cream
 * (mismo patrón que `SpeciesCard`/`AboutHero`). La forma orgánica del mockup
 * (dos elipses) se resuelve con un radio elíptico en vez de un SVG: no hace
 * falta un asset para una forma que es puro CSS.
 */
export function IntroBand({ title, body }: IntroBandProps) {
  return (
    <section
      data-surface="olive"
      className="rounded-[50%_50%_0_0/100%_100%_0_0] bg-surface px-8 py-20 text-fg sm:px-12 md:px-16 md:py-28"
    >
      <h2 className="text-center text-4xl font-bold tracking-wide text-heading md:text-5xl">
        {title}
      </h2>
      <p className="mx-auto mt-8 max-w-[882px] text-center text-base leading-relaxed md:text-xl">
        {body}
      </p>
    </section>
  );
}

export default IntroBand;
