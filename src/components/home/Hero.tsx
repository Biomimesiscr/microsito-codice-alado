import { Title } from "../core/titles/Title";
import { Paragraph } from "../core/paragraphs/Paragraph";
import { Button } from "../core/buttons/Button";
import { useTranslation } from "react-i18next";

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative h-full w-full flex flex-col justify-center px-8 sm:px-16 md:px-24 lg:px-32 z-10">
      <div className="max-w-5xl flex flex-col items-start gap-1 mx-auto w-full">
        <Title tag="h2" variant="secondary" className="mb-0 text-white font-normal text-3xl md:text-5xl">
          {t("hero.title")}
        </Title>
        <Title tag="h1" variant="primary" className="mb-4 text-3xl md:text-4xl font-bold">
          {t("hero.subtitle")}
        </Title>
        <Paragraph variant="body" className="mb-10 text-lg md:text-xl text-white/90">
          {t("hero.body")}
        </Paragraph>

        <div className="w-full flex justify-center mt-4">
          <Button variant="glass" size="lg" className="rounded-full px-12 py-3 text-2xl font-medium tracking-wide">
            {t("core.menu")}
          </Button>
        </div>
      </div>
    </section>
  );
}
