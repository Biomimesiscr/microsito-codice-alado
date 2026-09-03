export interface InsectHeroProps {
  label: string;
  title: string;
  subtitle: string;
  meta: string;
  body: string;
  image: string;
  alt?: string;
}

/**
 * Cabecera de la ficha. Dos columnas en `md+` (texto / foto), apiladas en
 * móvil. El radio grande de la imagen (`rounded-[60px]`) es la medida del
 * mockup, no una convención general del sitio.
 */
export function InsectHero({ label, title, subtitle, meta, body, image, alt }: InsectHeroProps) {
  return (
    <section className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
      <div>
        <p className="text-sm font-semibold tracking-[0.2em] text-accent uppercase">{label}</p>
        <h1 className="mt-3 text-5xl font-bold text-fg md:text-7xl lg:text-8xl">{title}</h1>
        <p className="mt-4 text-xl text-fg-muted md:text-2xl">{subtitle}</p>
        <p className="mt-2 text-sm font-medium tracking-wide text-fg-subtle uppercase">{meta}</p>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-muted md:text-lg">{body}</p>
      </div>

      <img
        src={image}
        alt={alt ?? ""}
        className="aspect-4/3 w-full rounded-[60px] object-cover"
      />
    </section>
  );
}

export default InsectHero;
