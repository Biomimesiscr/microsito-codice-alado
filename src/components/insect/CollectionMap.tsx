import Map, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { SectionHeading } from "../blocks/SectionHeading";

export interface CollectionMapSite {
  id: string;
  lng: number;
  lat: number;
  /** Etiqueta visible del marcador; si falta, usa `id`. */
  label?: string;
}

export interface CollectionMapProps {
  title: string;
  body?: string;
  center: { lng: number; lat: number };
  zoom: number;
  sites: CollectionMapSite[];
}

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN as string | undefined;

/**
 * Mapa de sitios de colecta con Mapbox real (`react-map-gl`). Sin
 * `VITE_MAPBOX_TOKEN` configurado degrada a un listado de sitios sobre
 * `bg-surface-raised` — mismo patrón de fallback que `BugImage`/`Portrait`
 * ante un asset que falta, aplicado aquí a un servicio externo sin
 * credenciales en vez de a un archivo.
 *
 * `scrollZoom={false}`: el mapa vive dentro de una página con scroll normal;
 * si el wheel hiciera zoom del mapa, secuestraría el scroll de la página.
 */
export function CollectionMap({ title, body, center, zoom, sites }: CollectionMapProps) {
  return (
    <section className="bg-surface-raised py-16">
      {/* Mismo contenedor que el resto de la ficha: sin él, el título quedaba
          pegado al borde de la ventana y desalineado con las demás secciones. */}
      <div className="mx-auto w-full max-w-6xl px-8 sm:px-12 md:px-16">
        <SectionHeading title={title} subtitle={body} />

        <div className="mt-8 h-[360px] overflow-hidden rounded-[22px] border border-line md:h-[520px]">
          {MAPBOX_TOKEN ? (
            <Map
              mapboxAccessToken={MAPBOX_TOKEN}
              initialViewState={{ longitude: center.lng, latitude: center.lat, zoom }}
              scrollZoom={false}
              style={{ width: "100%", height: "100%" }}
              mapStyle="mapbox://styles/mapbox/light-v11"
            >
              {sites.map((site) => (
                <Marker key={site.id} longitude={site.lng} latitude={site.lat}>
                  <span className="block size-4 rounded-full border-2 border-surface bg-accent" aria-hidden="true" />
                </Marker>
              ))}
            </Map>
          ) : (
            <div className="flex h-full flex-col justify-center gap-4 p-8">
              <p className="text-sm text-fg-subtle">
                {/* Fallback intencional: sin token, se lista el dato en vez de fallar
                    o mostrar un mapa roto. */}
                Mapbox no configurado — VITE_MAPBOX_TOKEN
              </p>
              <ul className="flex flex-col gap-2">
                {sites.map((site) => (
                  <li key={site.id} className="text-fg">
                    {site.label ?? site.id} — {site.lat.toFixed(4)}, {site.lng.toFixed(4)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default CollectionMap;
