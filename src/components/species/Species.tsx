import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { Surface } from "../layout/Surface";
import { AnimatedSection } from "../core/motion/AnimatedSection";
import { AnimatedFade } from "../core/motion/AnimatedFade";
import { SpeciesCard } from "./SpeciesCard";
import { SearchBar } from "./SearchBar";
import { speciesCategories } from "./speciesData";

export function Species() {
  const { t } = useTranslation();

  return (
    <Surface tone="cream" scroll>
      <div className="mx-auto w-full max-w-4xl px-8 py-10 sm:px-12 md:px-16">
        {/* El mockup sustituye el Header estándar por este breadcrumb, así que
            esta página monta su propio Surface en vez de colgar de Layout. */}
        <nav className="mb-8 flex items-center gap-5 text-sm">
          <Link to="/" className="text-fg-muted transition-colors duration-300 hover:text-accent">
            {t("species.breadcrumb.home")}
          </Link>
          <Link to="/menu" className="text-fg-muted transition-colors duration-300 hover:text-accent">
            {t("species.breadcrumb.menu")}
          </Link>
        </nav>

        <AnimatedSection delay={0.1}>
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            {/* Encabezados propios en vez de `Title`: sus variantes empaquetan
                color, peso y una escala de tamaños con breakpoints que gana a
                cualquier override puntual. El color sí sale de los tokens. */}
            <h1 className="text-4xl font-bold tracking-wide text-accent md:text-5xl">
              {t("species.title")}
            </h1>
            <SearchBar />
          </div>
        </AnimatedSection>

        {speciesCategories.map((category, categoryIndex) => (
          <AnimatedSection key={category.id} delay={0.2 + categoryIndex * 0.15}>
            <section className="mb-12">
              <h2 className="mb-5 text-2xl font-bold tracking-wide text-heading md:text-3xl">
                {t(`species.categories.${category.id}`)}
              </h2>

              <div className="grid gap-6 sm:grid-cols-2">
                {category.items.map((species, index) => (
                  <AnimatedFade
                    key={species.id}
                    delay={0.3 + categoryIndex * 0.15 + index * 0.08}
                    scale={0.96}
                  >
                    <SpeciesCard
                      species={species}
                      subtitle={t(`species.items.${species.id}`)}
                    />
                  </AnimatedFade>
                ))}
              </div>
            </section>
          </AnimatedSection>
        ))}
      </div>
    </Surface>
  );
}

export default Species;
