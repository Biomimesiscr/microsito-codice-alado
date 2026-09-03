/**
 * Catálogo de especies.
 *
 * Los nombres van literales: `Xylocopa`, `Euglossa` y `Ormyrus` son nombres de
 * género, idénticos en cualquier idioma. Los subtítulos y los rótulos de
 * categoría sí se traducen y se resuelven por `id` contra `species.*` en los
 * archivos de locales.
 *
 * `image` es un placeholder compartido hasta que haya ilustración por especie.
 */

const PLACEHOLDER_IMAGE = "/illustrations/bugs/microavispa.png";

export interface SpeciesItem {
  /** Clave de traducción del subtítulo: `species.items.<id>`. */
  id: string;
  name: string;
  image: string;
  illustration: string;
  /** Ruta de la infografía. */
  to: string;
}

export interface SpeciesCategory {
  /** Clave de traducción del rótulo: `species.categories.<id>`. */
  id: string;
  items: SpeciesItem[];
}

export const speciesCategories: SpeciesCategory[] = [
  // {
  //   id: "bees",
  //   items: [
  //   ],
  // },
  {
    id: "wasps",
    items: [
      { id: "parasitoides", name: "Parasitoides", image: "/images/bugs/microavispa.png", illustration: "/illustrations/bugs/microavispa.png", to: "/micro-avispa" },
    ],
  },
  {
    id: "beetles",
    items: [
      { id: "zopherus", name: "Zopherus", image: PLACEHOLDER_IMAGE, illustration: PLACEHOLDER_IMAGE, to: "/micro-avispa" },
      { id: "chrysina", name: "Chrysina", image: PLACEHOLDER_IMAGE, illustration: PLACEHOLDER_IMAGE, to: "/micro-avispa" },
    ],
  }
];
