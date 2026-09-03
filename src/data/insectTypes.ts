import type { LayerItem } from "../components/infography/types";

/**
 * Estructura de una ficha de insecto («Información del insecto»).
 *
 * Todo el copy visible vive en i18n bajo `insects.<id>.*` (igual que
 * `speciesData.ts` resuelve `species.items.<id>`); aquí solo van assets,
 * identificadores y datos que no se traducen (nombres científicos, colores).
 */
export interface InsectHeroData {
  image: string;
  alt?: string;
}

export interface InsectCarouselSlide {
  src: string;
  alt?: string;
}

/** Una entrada de taxonomía. El valor (nombre científico) es literal y vive
 * en el propio dato — no pasa por i18n porque es un nombre propio. */
export interface TaxonomyEntry {
  /** Clave de traducción de la etiqueta: `insects.<id>.taxonomy.labels.<id>`. */
  id: string;
  value: string;
}

export interface InsectTaxonomy {
  image: string;
  entries: TaxonomyEntry[];
}

export interface InsectScales {
  layers: LayerItem[];
  zoomLabels?: string[];
}

export interface CollectionSite {
  id: string;
  lng: number;
  lat: number;
}

export interface InsectCollection {
  center: { lng: number; lat: number };
  zoom: number;
  sites: CollectionSite[];
}

export interface InsectResearcher {
  /** Referencia a `src/data/teamData.ts`, no se duplica la persona aquí. */
  memberId: string;
  email: string;
  /** Claves de traducción: `insects.<id>.researcher.credentials.<id>`. */
  credentialIds: string[];
}

export interface InsectArticle {
  id: string;
  title: string;
  /** Sin URL, `ArrowList` renderiza el título como texto plano, no como enlace. */
  url?: string;
}

export interface InsectProject {
  /** Slug de URL y prefijo de i18n: `insects.<id>.*`. */
  id: string;
  hero: InsectHeroData;
  /**
   * Patrón de color real del insecto (dato científico, no de marca). Es la
   * única excepción admitida a la regla de "ningún color literal en código":
   * ver `src/index.css` y el README del catálogo.
   */
  pattern?: { colors: string[] };
  carousel: InsectCarouselSlide[];
  taxonomy: InsectTaxonomy;
  /** Nombres de género/especie, literales (nombres propios). */
  genera: string[];
  /** Infografía embebida en «Escalas biológicas». */
  scales?: InsectScales;
  collection?: InsectCollection;
  researcher: InsectResearcher;
  articles: InsectArticle[];
}
