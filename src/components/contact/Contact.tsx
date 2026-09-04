import { useTranslation } from "react-i18next";
import { Surface } from "../layout/Surface";
import { BackButton } from "../core/buttons/BackButton";
import { AnimatedSection } from "../core/motion/AnimatedSection";
import { AnimatedFade } from "../core/motion/AnimatedFade";
import type { DecorSlot } from "../decor/Decor";
import { ContactUsForm } from "./ContactUsForm";

// Datos de contacto del CICIMA: no son texto traducible, así que viven aquí y
// no en los locales.
const PHONE = "25115003";
const EMAIL = "cicima.ucr@ucr.ac.cr";

// La abeja del mockup es el mismo dibujo que `home2.png`. `Decor` lo usa como
// máscara, así que basta con pedir el color por `text-*` para tenerlo en crema
// en vez del rust del archivo. La caja replica la del mockup y el PNG comparte
// su relación de aspecto, así que el `contain` por defecto de `Decor` deja al
// insecto justo donde el diseño lo pone.
//
// `hidden md:block`: en móvil las columnas se apilan y la ilustración,
// dimensionada en % de una pantalla alta y estrecha, acaba sobre el formulario.
const decor: DecorSlot[] = [
  {
    src: "/illustrations/home2.png",
    className:
      "hidden md:block top-[28%] left-[54%] w-[44%] aspect-[1440/1024] text-fg",
  },
];

function PhoneIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 6 10 7 10-7" />
    </svg>
  );
}

export function Contact() {
  const { t } = useTranslation();

  return (
    <Surface tone="bark" scroll decor={decor}>
      <BackButton />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-8 py-24 sm:px-12 md:px-16 md:py-40">
        {/* Una sola columna de contenido; la mitad derecha la ocupa la abeja,
            que va en el decorado y no en el flujo. */}
        <div className="md:w-3/5">
          <AnimatedSection delay={0.1}>
            <h1 className="max-w-[547px] text-4xl font-medium tracking-wide text-fg md:text-5xl">
              {t("contact.heading")}
            </h1>
            <p className="mt-6 max-w-[547px] text-lg leading-snug text-fg md:text-2xl">
              {t("contact.intro")}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="mt-16 max-w-[459px]">
              <ContactUsForm />
            </div>
          </AnimatedSection>

          <AnimatedFade delay={0.5}>
            <address className="mt-24 flex md:mt-40 flex-col gap-2 text-lg not-italic text-fg md:text-2xl">
              <a
                href={`tel:${PHONE}`}
                className="flex items-center gap-3 transition-colors duration-300 hover:text-fg-muted"
              >
                <PhoneIcon />
                {PHONE}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-3 transition-colors duration-300 hover:text-fg-muted"
              >
                <EmailIcon />
                {EMAIL}
              </a>
            </address>
          </AnimatedFade>
        </div>
      </div>
    </Surface>
  );
}

export default Contact;
