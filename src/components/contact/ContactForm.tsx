import type { FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../core/buttons/Button";
import { UnderlineField } from "./UnderlineField";

export function ContactForm() {
  const { t } = useTranslation();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: solo maquetado. No hay backend todavía; escribir funciona pero
    // enviar no hace nada. Conectarlo es sustituir este handler.
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-7">
      <h2 className="text-xl font-bold tracking-wide text-accent md:text-2xl">
        {t("contact.formTitle")}
      </h2>

      <UnderlineField id="name" label={t("contact.fields.name")} />
      <UnderlineField id="email" type="email" label={t("contact.fields.email")} />
      <UnderlineField id="message" multiline label={t("contact.fields.message")} />

      {/* `solid` resuelve a bg-accent + text-surface: sobre oliva es píldora
          arena con texto oliva, que es lo del mockup. `pill` daría lo inverso. */}
      <Button type="submit" variant="solid" size="sm" className="self-start rounded-full">
        {t("contact.submit")}
      </Button>
    </form>
  );
}

export default ContactForm;
