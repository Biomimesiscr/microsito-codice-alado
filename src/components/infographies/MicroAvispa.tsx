import { InfographyCanvas } from "../infography/InfographyCanvas";
import { TitleBlock } from "../blocks/TitleBlock";
import { BodyText } from "../blocks/BodyText";
import { BugImage } from "../blocks/BugImage";
import ColorsDetail from "../blocks/ColorsDetail";
// import { SectionLabel } from '../blocks/SectionLabel'
import type { LayerItem } from "../infography/types";

const layers: LayerItem[] = [
  // ── Capa 0: vista general ──────────────────────────
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

  // ── Capa 1: descripción física ─────────────────────
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
      <ColorsDetail colors={["red", "#00FF00", "#0000FF"]} size={60} />
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

export function MicroAvispa() {
  return (
    <InfographyCanvas
      height="100%"
      zoomLabels={["%100", "%125"]} // layers
      layers={layers}
    />
  );
}
