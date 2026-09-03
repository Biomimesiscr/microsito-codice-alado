import { useTranslation } from "react-i18next";
import { Surface } from "../layout/Surface";
import { BackButton } from "../core/buttons/BackButton";
import { AnimatedSection } from "../core/motion/AnimatedSection";
import { AboutHero } from "./AboutHero";
import { TeamSection } from "./TeamSection";
import { team } from "../../data/teamData";

/**
 * «Sobre nosotros». Monta su propio `Surface` en vez de colgar de `Layout`
 * porque el mockup sustituye el Header por la flecha de volver, igual que
 * hacen Especies y Contacto.
 *
 * La banda musgo llega hasta el borde de la ventana, así que el padding
 * horizontal vive en cada sección y no en un contenedor común.
 */
export function About() {
  const { t } = useTranslation();

  return (
    <Surface tone="cream" scroll className="pb-24">
      <BackButton />

      <AnimatedSection  duration={2}>
        <AboutHero
          title={t("about.cicima.title")}
          body={t("about.cicima.body")}
        />
      </AnimatedSection>

      <TeamSection title={t("about.team.title")} members={team} />
    </Surface>
  );
}

export default About;
