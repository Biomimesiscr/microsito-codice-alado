export interface AboutHeroProps {
  title: string;
  body: string;
}

/**
 * Banda de presentación del CICIMA.
 *
 * Es una isla `data-surface="moss"` dentro de una página cream, el mismo truco
 * que usa `SpeciesCard` con su zona olive: así el color sale de los tokens
 * semánticos (`bg-surface`, `text-fg`) y no hay ni un literal en el componente.
 *
 * El radio solo va abajo porque la banda arranca pegada al borde superior de
 * la ventana; `rounded-b-[56px]` es la medida del mockup.
 *
 * `relative z-10`: la tarjeta del equipo se solapa por debajo con un margen
 * negativo y, al ir después en el DOM, taparía esta banda. En el mockup pasa lo
 * contrario — es la banda la que oculta el borde superior de la tarjeta.
 */
export function AboutHero({ title, body }: AboutHeroProps) {
  return (
    <section
      data-surface="moss"
      className="relative z-10 rounded-b-[56px] bg-surface px-8 pt-28 pb-20 text-fg sm:px-12 md:px-16 md:pt-32 md:pb-24"
    >
      <h1 className="text-center text-3xl font-medium tracking-wide md:text-5xl">
        {title}
      </h1>
      <p className="mx-auto mt-8 max-w-[938px] text-center text-base leading-relaxed md:text-2xl">
        {body}
      </p>
    </section>
  );
}

export default AboutHero;
