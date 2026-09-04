import type { ChangeEvent } from "react";

export interface UnderlineFieldProps {
  id: string;
  label: string;
  type?: "text" | "email";
  /** Renderiza un `<textarea>` en vez de un `<input>`. */
  multiline?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  /** Mensaje de validación. Si viene, marca el campo como inválido. */
  error?: string;
  /** Clases extra para el control, p. ej. el cuerpo a 24px del mockup. */
  className?: string;
}

/**
 * Campo con solo borde inferior. La etiqueta va como `placeholder` para
 * replicar el mockup, y se repite en `aria-label` para no dejar el campo sin
 * nombre accesible.
 *
 * `border-fg-muted` y no `border-line`: sobre la superficie oliva ese token es
 * oliva claro, más oscuro que el fondo, y aquí el subrayado debe verse claro.
 *
 * Sin `value`/`onChange` sigue siendo un campo no controlado, que es como lo
 * usa `ContactForm`.
 */
export function UnderlineField({
  id,
  label,
  type = "text",
  multiline = false,
  value,
  onChange,
  required = false,
  error,
  className = "",
}: UnderlineFieldProps) {
  const controlClassName =
    `w-full bg-transparent border-0 border-b border-fg-muted pb-2 text-fg placeholder:text-fg-muted focus:border-accent focus:outline-none transition-colors duration-300 resize-none ${className}`.trim();

  const shared = {
    id,
    name: id,
    placeholder: label,
    "aria-label": label,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
    required,
    className: controlClassName,
    ...(onChange
      ? {
          value: value ?? "",
          onChange: (
            event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
          ) => onChange(event.target.value),
        }
      : {}),
  };

  return (
    <div>
      {multiline ? (
        <textarea rows={1} {...shared} />
      ) : (
        <input type={type} {...shared} />
      )}
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-fg-subtle">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default UnderlineField;
