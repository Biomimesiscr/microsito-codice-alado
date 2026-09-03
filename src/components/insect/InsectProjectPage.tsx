import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { Surface } from "../layout/Surface";
import { AnimatedSection } from "../core/motion/AnimatedSection";
import { ImageCarousel } from "../core/media/ImageCarousel";
import { InsectHero } from "./InsectHero";
import { PatternStatement } from "./PatternStatement";
import { IntroBand } from "./IntroBand";
import { TaxonomyPanel } from "./TaxonomyPanel";
import { ScalesSection } from "./ScalesSection";
import { CollectionMap } from "./CollectionMap";
import { ResearcherBand } from "./ResearcherBand";
import { RelatedArticles } from "./RelatedArticles";
import { team } from "../../data/teamData";
import type { InsectProject } from "../../data/insectTypes";

export interface InsectProjectPageProps {
  project: InsectProject;
}

/**
 * Orquestador de la ficha de insecto. Monta el shell de página (breadcrumb +
 * `Surface`, igual que `Species.tsx`) y compone las secciones en el orden
 * del diseño, envueltas en `AnimatedSection`. Cada sección se omite si sus
 * datos faltan, así una ficha sin mapa o sin infografía sigue funcionando.
 */
export function InsectProjectPage({ project }: InsectProjectPageProps) {
  const { t } = useTranslation();
  const base = `insects.${project.id}`;
  const researcher = team.find((member) => member.id === project.researcher.memberId);

  const taxonomyEntries = project.taxonomy.entries.map((entry) => ({
    label: t(`${base}.taxonomy.labels.${entry.id}`),
    value: entry.value,
  }));

  const collectionSites = (project.collection?.sites ?? []).map((site) => ({
    ...site,
    label: t(`${base}.collection.sites.${site.id}`, { defaultValue: site.id }),
  }));

  const credentials = project.researcher.credentialIds.map((id) =>
    t(`${base}.researcher.credentials.${id}`),
  );

  return (
    <Surface tone="cream" scroll>
      <div className="mx-auto w-full max-w-6xl px-8 py-10 sm:px-12 md:px-16">
        {/* Mismo breadcrumb que `Species.tsx`: esta ficha reemplaza el Header
            estándar, así que monta su propio Surface. */}
        <nav className="mb-10 flex items-center gap-5 text-sm">
          <Link to="/" className="text-fg-muted transition-colors duration-300 hover:text-accent">
            {t("species.breadcrumb.home")}
          </Link>
          <Link to="/menu" className="text-fg-muted transition-colors duration-300 hover:text-accent">
            {t("species.breadcrumb.menu")}
          </Link>
        </nav>

        <div className="flex flex-col gap-20 md:gap-28">
          <AnimatedSection delay={0.1}>
            <InsectHero
              label={t(`${base}.label`)}
              title={t(`${base}.title`)}
              subtitle={t(`${base}.subtitle`)}
              meta={t(`${base}.meta`)}
              body={t(`${base}.body`)}
              image={project.hero.image}
              alt={project.hero.alt}
            />
          </AnimatedSection>

          {/* El orden del mockup es héroe → enunciado del patrón → carrusel. */}
          {project.pattern && (
            <AnimatedSection delay={0.15}>
              <PatternStatement
                colors={project.pattern.colors}
                highlight={t(`${base}.pattern.highlight`)}
                caption={
                  <>
                    {t(`${base}.pattern.captionLine1`)}
                    <br />
                    {t(`${base}.pattern.captionLine2`)}
                  </>
                }
              >
                {t(`${base}.pattern.text`, { highlight: t(`${base}.pattern.highlight`) })}
              </PatternStatement>
            </AnimatedSection>
          )}

          {project.carousel.length > 0 && (
            <AnimatedSection delay={0.2}>
              <ImageCarousel slides={project.carousel} />
            </AnimatedSection>
          )}
        </div>
      </div>

      <AnimatedSection delay={0.2}>
        <IntroBand title={t(`${base}.intro.title`)} body={t(`${base}.intro.body`)} />
      </AnimatedSection>

      <AnimatedSection delay={0.25}>
        <TaxonomyPanel
          image={project.taxonomy.image}
          title={t(`${base}.taxonomy.title`)}
          entries={taxonomyEntries}
          generaTitle={t(`${base}.genera.title`)}
          genera={project.genera}
        />
      </AnimatedSection>

      <div className="mx-auto w-full max-w-6xl px-8 py-20 sm:px-12 md:px-16">
        {project.scales && (
          <AnimatedSection delay={0.1}>
            <ScalesSection
              title={t(`${base}.scales.title`)}
              body={t(`${base}.scales.body`)}
              layers={project.scales.layers}
              zoomLabels={project.scales.zoomLabels}
            />
          </AnimatedSection>
        )}
      </div>

      {project.collection && (
        <AnimatedSection delay={0.1}>
          <CollectionMap
            title={t(`${base}.collection.title`)}
            body={t(`${base}.collection.intro`)}
            center={project.collection.center}
            zoom={project.collection.zoom}
            sites={collectionSites}
          />
        </AnimatedSection>
      )}

      {researcher && (
        <AnimatedSection delay={0.1}>
          <ResearcherBand
            name={researcher.name}
            role={t(`${base}.researcher.role`)}
            email={project.researcher.email}
            photo={researcher.photo}
            sectionTitle={t(`${base}.researcher.title`)}
            profileTitle={t(`${base}.researcher.profileTitle`)}
            credentials={credentials}
            ctaLabel={t(`${base}.researcher.cta`)}
            ctaTo="/contact"
          />
        </AnimatedSection>
      )}

      {project.articles.length > 0 && (
        <AnimatedSection delay={0.1}>
          <RelatedArticles
            title={t(`${base}.articles.title`)}
            articles={project.articles.map((article) => ({
              title: article.title,
              url: article.url,
            }))}
          />
        </AnimatedSection>
      )}
    </Surface>
  );
}

export default InsectProjectPage;
