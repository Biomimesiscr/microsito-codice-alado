import { Link } from "react-router";
import { Portrait } from "../contact/Portrait";
import { Button } from "../core/buttons/Button";
import { ArrowIcon } from "../core/icons/ArrowIcon";

export interface ResearcherBandProps {
  name: string;
  role: string;
  email: string;
  photo: string;
  sectionTitle: string;
  profileTitle: string;
  credentials: string[];
  ctaLabel: string;
  ctaTo: string;
}

/**
 * Banda «¡Conocé al equipo detrás del proyecto!» a sangre. Isla
 * `data-surface="olive"`, igual que `IntroBand`. Reutiliza `Portrait` (foto
 * de perfil circular) y `Button variant="pill"` en vez de reinventarlos; los
 * datos de la persona vienen de `src/data/teamData.ts` por `memberId`, esta
 * pieza no los duplica.
 */
export function ResearcherBand({
  name,
  role,
  email,
  photo,
  sectionTitle,
  profileTitle,
  credentials,
  ctaLabel,
  ctaTo,
}: ResearcherBandProps) {
  return (
    <section
      data-surface="olive"
      className="bg-surface py-20 text-fg md:py-28"
    >
      {/* Contenedor común de la ficha. El título va a la izquierda, como en el
          mockup, no centrado. */}
      <div className="mx-auto w-full max-w-6xl px-8 sm:px-12 md:px-16">
        <h2 className="text-3xl font-bold tracking-wide text-heading md:text-5xl">
          {sectionTitle}
        </h2>

        <div className="mt-14 grid gap-10 md:grid-cols-[auto_1fr] md:items-start md:gap-16">
          <div className="flex flex-col items-center gap-3">
            <Portrait src={photo} alt={name} size={176} />
            <p className="text-center text-lg font-medium">{name}</p>
            <p className="text-center text-sm text-fg-subtle">{role}</p>
            <p className="text-center text-sm text-fg-muted">{email}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-heading md:text-2xl">{profileTitle}</h3>
            <ul className="mt-6 flex flex-col gap-3">
              {credentials.map((credential) => (
                <li key={credential} className="flex items-start gap-3">
                  <ArrowIcon className="mt-2 h-[6px] w-[20px] shrink-0 text-accent" />
                  <span>{credential}</span>
                </li>
              ))}
            </ul>

            <Button variant="pill" size="md" className="mt-8">
              <Link to={ctaTo} className="block h-full w-full">
                {ctaLabel}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResearcherBand;
