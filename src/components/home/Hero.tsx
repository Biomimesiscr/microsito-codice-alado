import { Title } from "../core/titles/Title";
import { Paragraph } from "../core/paragraphs/Paragraph";
import { Button } from "../core/buttons/Button";
import { AnimatedSection } from "../core/motion/AnimatedSection";
import { AnimatedFade } from "../core/motion/AnimatedFade";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

export function Hero() {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleMenuClick = () => {
    navigate("/menu");
  };

  return (
    <section className="relative h-full w-full flex flex-col justify-center px-8 sm:px-16 md:px-24 lg:px-32 z-10">
      <div className="max-w-5xl flex flex-col items-start gap-1 mx-auto w-full">
        <AnimatedSection delay={0.2}>
          <Title tag="h2" variant="secondary" className="mb-0 text-white font-normal text-3xl md:text-5xl">
            {t("hero.title")}
          </Title>
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <Title tag="h1" variant="primary" className="mb-4 text-3xl md:text-4xl font-bold">
            {t("hero.subtitle")}
          </Title>
        </AnimatedSection>

        <AnimatedSection delay={0.6}>
          <Paragraph variant="body" className="mb-10 text-lg md:text-xl text-white/90">
            {t("hero.body")}
          </Paragraph>
        </AnimatedSection>

        <div className="w-full flex justify-center mt-4">
          <AnimatedFade delay={0.8} scale={0.92}>
            <Button onClick={handleMenuClick} variant="glass" size="lg" className="rounded-full px-12 py-3 text-2xl font-medium tracking-wide">
              {t("core.menu")}
            </Button>
          </AnimatedFade>
        </div>
      </div>
    </section>
  );
}