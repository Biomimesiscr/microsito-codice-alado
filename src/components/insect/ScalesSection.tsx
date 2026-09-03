import { SectionHeading } from "../blocks/SectionHeading";
import { InfographyCanvas } from "../infography/InfographyCanvas";
import type { LayerItem } from "../infography/types";

export interface ScalesSectionProps {
  title: string;
  body: string;
  layers: LayerItem[];
  zoomLabels?: string[];
}

/**
 * «Escalas biológicas»: embebe la infografía completa dentro de una caja de
 * altura fija (en vez de pantalla completa como en `/micro-avispa`), así el
 * zoom con rueda del ratón queda contenido y no secuestra el scroll de la
 * página.
 */
export function ScalesSection({ title, body, layers, zoomLabels }: ScalesSectionProps) {
  return (
    <section>
      <SectionHeading title={title} subtitle={body} />
      <div className="mt-8 h-[480px] overflow-hidden rounded-[22px] border border-line md:h-[748px]">
        <InfographyCanvas height="100%" layers={layers} zoomLabels={zoomLabels} />
      </div>
    </section>
  );
}

export default ScalesSection;
