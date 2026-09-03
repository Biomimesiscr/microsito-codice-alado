/**
 * Datos de la ficha «Micro Avispas» (`/insecto/micro-avispas`).
 *
 * Todo el copy pasa por i18n bajo `insects.microAvispas.*`; aquí solo van
 * assets, identificadores y los pocos valores literales permitidos: nombres
 * científicos (no se traducen) y el patrón de color BOB (dato biológico real,
 * la única excepción a "ningún color literal en componentes" — ver
 * `src/components/insect/README.md`).
 */
import { TitleBlock } from "../../components/blocks/TitleBlock";
import { BodyText } from "../../components/blocks/BodyText";
import { BugImage } from "../../components/blocks/BugImage";
import ColorsDetail from "../../components/blocks/ColorsDetail";
import type { LayerItem } from "../../components/infography/types";
import type { InsectProject } from "../insectTypes";

// Copia de las capas de `src/components/infographies/MicroAvispa.tsx`: esa
// ruta standalone (`/micro-avispa`) sigue viva tal cual, así que las capas se
// duplican aquí en vez de importarlas, para no acoplar ambos puntos de entrada.
const scalesLayers: LayerItem[] = [
  {
    layer: 0,
    x: "50%",
    y: 200,
    component: <TitleBlock prefix="MICRO" bold="AVISPA" />,
  },
  {
    layer: 0,
    x: "50%",
    y: 250,
    component: (
      <BodyText maxWidth={340}>
        Las microavispas de la familia Platygastridae son un grupo de avispas
        pequeñas, cuyo ciclo de vida se resume principalmente dentro de los
        huevos de otros insectos y arañas.
      </BodyText>
    ),
  },
  {
    layer: [0, 1],
    x: "50%",
    y: 350,
    zoomable: true,
    component: <BugImage src="/wasp.png" size={80} alt="Microavispa" />,
    navigateTo: 1,
  },
  {
    layer: 1,
    x: "20%",
    y: "20%",
    component: (
      <BodyText maxWidth={340} textAlign="right">
        Las microavispas de la familia Platygastridae son un grupo de avispas
        pequeñas, cuyo ciclo de vida se resume principalmente dentro de los
        huevos de otros insectos y arañas.
      </BodyText>
    ),
  },
  {
    layer: 1,
    x: "25%",
    y: "35%",
    zoomable: true,
    component: (
      <ColorsDetail
        colors={["var(--color-rust)", "var(--color-moss)", "var(--color-sand)"]}
        size={60}
      />
    ),
  },
  {
    layer: 1,
    x: "20%",
    y: "45%",
    component: (
      <BodyText maxWidth={340} textAlign="right">
        Las microavispas de la familia Platygastridae son un grupo de avispas
        pequeñas, cuyo ciclo de vida se resume principalmente dentro de los
        huevos de otros insectos y arañas.
      </BodyText>
    ),
  },
];

export const microAvispas: InsectProject = {
  id: "microAvispas",

  hero: {
    // El mockup reutiliza la misma foto en la portada y en el panel de
    // taxonomía (mismo nodo de imagen en Figma).
    image: "/images/insects/micro-avispas/hero.jpg",
    alt: "Micro avispa fotografiada de cerca",
  },

  // Patrón black-orange-black (BOB), estudiado en Scelionidae. Colores reales
  // del insecto, no de marca: única excepción a la regla de color del tema.
  pattern: { colors: ["#000000", "#EA8300", "#000000"] },

  carousel: [
    { src: "/images/insects/micro-avispas/carrusel-1.jpg" },
    { src: "/images/insects/micro-avispas/carrusel-2.jpg" },
    { src: "/images/insects/micro-avispas/carrusel-3.jpg" },
    { src: "/images/insects/micro-avispas/carrusel-4.jpg" },
    { src: "/images/insects/micro-avispas/carrusel-5.jpg" },
  ],

  taxonomy: {
    image: "/images/insects/micro-avispas/hero.jpg",
    entries: [
      { id: "order", value: "Hymenoptera" },
      { id: "family", value: "Platygastridae" },
      { id: "subfamily", value: "Scelionidae" },
    ],
  },

  genera: [
    "Acanthoscelio Ashmead",
    "Baryconus Foerster",
    "Chromoteleia Ashmead",
    "Macroteleia Westwood",
    "Opisthacantha Ashmead (Lapitha Ashmead)",
    "Scelio Latreille",
    "Sceliomorpha Ashmead",
    "Triteleia Kieffer",
  ],

  scales: {
    layers: scalesLayers,
    zoomLabels: ["%100", "%125"],
  },

  collection: {
    // Ciudad Colón / Universidad para la Paz, Costa Rica.
    center: { lng: -84.2472, lat: 9.9128 },
    zoom: 14,
    sites: [{ id: "upaz", lng: -84.2472, lat: 9.9128 }],
  },

  researcher: {
    memberId: "rebeca",
    email: "rebeca.mora@ucr.ac.cr",
    credentialIds: ["phd", "faculty", "biomimicry", "guestFaculty", "researchLines"],
  },

  articles: [
    {
      id: "aposematic",
      title:
        "First evidence for an aposematic function of a very common color pattern in small insects.",
      url: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0237288",
    },
    {
      id: "spectralBob",
      title:
        "Spectral measure of color variation of black-orange-black (BOB) pattern in small parasitoid wasps (Hymenoptera: Scelionidae), a statistical approach.",
      url: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0218061",
    },
    {
      id: "biologyOptics",
      title: "Connecting biology, optics and nanomechanical properties in micro-wasps.",
      url: "https://www.nature.com/articles/s41598-020-58301-2",
    },
    {
      id: "phenologySalticidae",
      title:
        "Phenology of an urban population of Lyssomanes jemineus Peckham & Wheeler (Araneae: Salticidae) with a list of other jumping spiders from the same Costa Rican site.",
      url: "https://academic.oup.com/jinsectscience/article/19/2/13/5372556",
    },
    {
      id: "widespreadBob",
      title: "Widespread occurrence of black-orange-black color pattern in Hymenoptera.",
      // Sin URL en el diseño: se renderiza como texto plano, no como enlace.
    },
  ],
};

export default microAvispas;
