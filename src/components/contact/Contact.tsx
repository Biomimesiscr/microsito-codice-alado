import { useTranslation } from "react-i18next";
import { Surface } from "../layout/Surface";
import { BackButton } from "../core/buttons/BackButton";
import { AnimatedSection } from "../core/motion/AnimatedSection";
import { AnimatedFade } from "../core/motion/AnimatedFade";
import type { DecorSlot } from "../decor/Decor";
import { Portrait } from "./Portrait";
import { ContactForm } from "./ContactForm";
import { team } from "./contactData";

// Se reutilizan los PNG del home como placeholder. `maskSize` va por encima de
// `contain` porque estos archivos traen mucho margen vacío alrededor del insecto.
//
// `hidden md:block`: es una composición de escritorio. En móvil las columnas se
// apilan y las ilustraciones, dimensionadas en % de una pantalla alta y estrecha,
// acaban encima del formulario.
const decor: DecorSlot[] = [
  {
    src: "/illustrations/home1.png",
    className:
      "hidden md:block -bottom-[6%] -left-[10%] h-[38%] aspect-[1440/1024] text-accent opacity-70",
    style: { maskSize: "150%", WebkitMaskSize: "150%" },
  },
  {
    src: "/illustrations/home2.png",
    className:
      "hidden md:block -bottom-[10%] -right-[8%] h-[50%] aspect-[1440/1024] text-accent opacity-70",
    style: { maskSize: "150%", WebkitMaskSize: "150%", transform: "scaleX(-1)" },
  },
];

export function Contact() {
  const { t } = useTranslation();
  const member = team[0];

  return (
    <Surface tone="olive" scroll decor={decor}>
      <BackButton />

      <div className="relative z-10 mx-auto w-full max-w-4xl px-8 py-24 sm:px-12 md:px-16">
        <AnimatedSection delay={0.1}>
          <h1 className="mb-16 max-w-2xl text-2xl leading-snug tracking-wide text-accent md:text-3xl">
            {t("contact.title")}
          </h1>
        </AnimatedSection>

        <div className="grid gap-12 md:grid-cols-[auto_1fr] md:gap-16">
          <AnimatedFade delay={0.3} scale={0.95}>
            <figure className="flex flex-col items-center gap-3">
              <Portrait src={member.photo} alt={member.name} />
              <figcaption className="text-center">
                <p className="text-fg">{member.name}</p>
                <p className="mt-1 text-xs text-fg-subtle">
                  {t(`contact.team.${member.id}.role`)}
                </p>
              </figcaption>
            </figure>
          </AnimatedFade>

          <AnimatedSection delay={0.4}>
            <ContactForm />
          </AnimatedSection>
        </div>
      </div>
    </Surface>
  );
}

export default Contact;
