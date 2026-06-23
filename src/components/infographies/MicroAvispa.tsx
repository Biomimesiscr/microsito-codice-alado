import { InfographyCanvas } from '../infography/InfographyCanvas'
import { TitleBlock } from '../blocks/TitleBlock'
import { BodyText } from '../blocks/BodyText'
import { BugImage } from '../blocks/BugImage'
import { FactList } from '../blocks/FactList'
import { BlobDetail } from '../blocks/BlobDetail'
import { SectionLabel } from '../blocks/SectionLabel'
import type { LayerItem } from '../infography/types'

const layers: LayerItem[] = [
  // ── Capa 0: vista general ──────────────────────────
  {
    layer: 0,
    x: '50%',
    y: 80,
    component: <TitleBlock prefix="MICRO" bold="AVISPA" />,
  },
  {
    layer: 0,
    x: '50%',
    y: 180,
    component: (
      <BodyText maxWidth={340}>
        Las microavispas de la familia Platygastridae son un grupo de avispas
        pequeñas, cuyo ciclo de vida se resume principalmente dentro de los
        huevos de otros insectos y arañas.
      </BodyText>
    ),
  },
  {
    layer: 0,
    x: '50%',
    y: 300,
    component: <BugImage src="/wasp.png" size={80} alt="Microavispa" />,
  },

  // ── Capa 1: descripción física ─────────────────────
  {
    layer: 1,
    x: 32,
    y: 20,
    component: (
      <FactList
        title="Descripción física"
        items={[
          'Longitud de 0.5 a 2 mm según el género',
          'Cabeza negra, mesosomal naranja o negro',
          'Patrón OCB: black / orange / black',
          'Alas con venación muy reducida',
          'Antenas con 10–12 segmentos',
        ]}
      />
    ),
  },
  {
    layer: 1,
    x: '50%',
    y: '50%',
    component: <BugImage src="/images/avispa.png" size={150} alt="Microavispa" />,
  },
  {
    layer: 1,
    x: 'calc(100% - 220px)',
    y: 20,
    component: (
      <FactList
        title="Algunas cifras"
        items={['Parasita +200 especies', '98% tasa de éxito', 'Ciclo: 10–14 días']}
      />
    ),
  },
  {
    layer: 1,
    x: 'calc(100% - 100px)',
    y: 'calc(100% - 100px)',
    component: <BlobDetail src="/images/larva.png" label="Larva en huésped" />,
  },

  // ── Capa 2: detalle estructural ────────────────────
  {
    layer: 2,
    x: 28,
    y: 16,
    component: (
      <FactList
        title="Tercer axilares"
        items={[
          'Patrón oclb conservado en Platygastrinae',
          'Pigmento concentrado en superficie dorsal del mesonoto',
          'Microestructuras varían entre géneros',
          'Posible función en termorregulación',
        ]}
      />
    ),
  },
  {
    layer: 2,
    x: '50%',
    y: '50%',
    component: <BugImage src="/images/avispa.png" size={190} alt="Microavispa" />,
  },
  {
    layer: 2,
    x: 'calc(100% - 200px)',
    y: 16,
    component: <SectionLabel title="MACRO del" subtitle="mesosoma" align="right" />,
  },
]

export function MicroAvispa() {
  return (
    <InfographyCanvas
      height={420}
      zoomLabels={['%95', '%120', '%125']}
      layers={layers}
    />
  )
}
