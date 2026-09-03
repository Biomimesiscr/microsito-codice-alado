import { DefinitionList, type DefinitionEntry } from "../blocks/DefinitionList";
import { ArrowList } from "../blocks/ArrowList";

export interface TaxonomyPanelProps {
  image: string;
  title: string;
  entries: DefinitionEntry[];
  generaTitle: string;
  genera: string[];
}

/**
 * Sigue dentro de la isla olive de `IntroBand` en el mockup: foto a la
 * izquierda, taxonomía a la derecha separada por un borde, y debajo una
 * tarjeta clara (`data-surface="cream"`) con la lista de géneros a 2
 * columnas. `rounded-tl-*` en ambos bloques son las medidas del mockup.
 *
 * La foto lleva `max-w-[572px]` y proporción 572/629: son las medidas del
 * mockup y sin ellas la imagen crece hasta media pantalla al ensancharse la
 * ventana, que es lo que rompía la composición.
 */
export function TaxonomyPanel({ image, title, entries, generaTitle, genera }: TaxonomyPanelProps) {
  return (
    <section data-surface="olive" className="bg-surface pb-20 text-fg">
      <div className="mx-auto w-full max-w-6xl px-8 sm:px-12 md:px-16">
        <div className="grid gap-10 md:grid-cols-2 md:items-stretch md:gap-0 md:border-l md:border-line">
          <img
            src={image}
            alt=""
            className="aspect-[572/629] w-full max-w-[572px] rounded-tl-[80px] object-cover md:order-first"
          />
          <div className="flex flex-col justify-center md:pl-12">
            <h2 className="mb-8 text-3xl font-bold text-heading md:text-4xl">{title}</h2>
            <DefinitionList entries={entries} />
          </div>
        </div>

        <div data-surface="cream" className="mt-10 rounded-tl-[16px] bg-surface p-8 text-fg md:p-12">
          <h3 className="mb-6 text-2xl font-bold text-heading md:text-3xl">{generaTitle}</h3>
          <ArrowList items={genera} columns={2} />
        </div>
      </div>
    </section>
  );
}

export default TaxonomyPanel;
