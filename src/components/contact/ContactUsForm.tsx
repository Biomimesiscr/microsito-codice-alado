import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../core/buttons/Button";
import { UnderlineField } from "./UnderlineField";

type FieldName = "name" | "email" | "message";

const EMPTY: Record<FieldName, string> = { name: "", email: "", message: "" };

// Validación deliberadamente laxa: solo descarta erratas obvias. La comprobación
// real de un correo es entregarle un mensaje.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Formulario de «Contáctanos». Reemplaza a `ContactForm` en la página pública;
 * aquél sigue en uso por `ResearcherContact`.
 */
export function ContactUsForm() {
  const { t } = useTranslation();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [sent, setSent] = useState(false);

  // Editar cualquier campo retira el acuse: si el usuario vuelve a escribir es
  // que quiere mandar otro mensaje, no releer la confirmación del anterior.
  const update = (field: FieldName) => (value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSent(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const next: Partial<Record<FieldName, string>> = {};
    (Object.keys(EMPTY) as FieldName[]).forEach((field) => {
      if (!values[field].trim()) next[field] = t("contact.errors.required");
    });
    if (!next.email && !EMAIL.test(values.email.trim())) {
      next.email = t("contact.errors.email");
    }

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    // TODO: no hay backend todavía. El envío real va justo aquí; lo demás
    // (validación y acuse) ya está resuelto.
    setValues(EMPTY);
    setSent(true);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <UnderlineField
        id="name"
        label={t("contact.fields.name")}
        value={values.name}
        onChange={update("name")}
        error={errors.name}
        required
        className="text-lg md:text-2xl"
      />
      <UnderlineField
        id="email"
        type="email"
        label={t("contact.fields.email")}
        value={values.email}
        onChange={update("email")}
        error={errors.email}
        required
        className="text-lg md:text-2xl"
      />
      <UnderlineField
        id="message"
        multiline
        label={t("contact.fields.message")}
        value={values.message}
        onChange={update("message")}
        error={errors.message}
        required
        className="text-lg md:text-2xl"
      />

      <div className="mt-14 flex items-center gap-4">
        <Button
          type="submit"
          variant="cta"
          size="sm"
          className="px-5 text-base sm:text-base md:text-lg"
        >
          {t("contact.submit")}
        </Button>
        {sent ? (
          <p role="status" className="text-sm text-fg">
            {t("contact.success")}
          </p>
        ) : null}
      </div>
    </form>
  );
}

export default ContactUsForm;
