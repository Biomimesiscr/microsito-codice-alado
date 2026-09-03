import { SectionHeading } from "../blocks/SectionHeading";
import { ArrowList, type ArrowListItem } from "../blocks/ArrowList";

export interface RelatedArticlesEntry {
  title: string;
  url?: string;
}

export interface RelatedArticlesProps {
  title: string;
  articles: RelatedArticlesEntry[];
}

/**
 * Banda de artículos relacionados. `bg-surface-raised` (banda intermedia del
 * diseño) + `ArrowList` de enlaces externos; un artículo sin `url` se
 * renderiza como texto plano (ver `ArrowList`).
 */
export function RelatedArticles({ title, articles }: RelatedArticlesProps) {
  const items: ArrowListItem[] = articles.map((article) => ({
    text: article.title,
    href: article.url,
  }));

  return (
    <section className="bg-surface-raised py-16">
      {/* Mismo contenedor que el resto de la ficha, para que el título quede
          alineado con las demás secciones y no con el borde de la ventana. */}
      <div className="mx-auto w-full max-w-6xl px-8 sm:px-12 md:px-16">
        <SectionHeading title={title} />
        <div className="mt-8">
          <ArrowList items={items} columns={1} />
        </div>
      </div>
    </section>
  );
}

export default RelatedArticles;
