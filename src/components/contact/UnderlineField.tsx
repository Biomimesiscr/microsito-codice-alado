export interface UnderlineFieldProps {
  id: string;
  label: string;
  type?: "text" | "email";
  /** Renderiza un `<textarea>` en vez de un `<input>`. */
  multiline?: boolean;
}

/**
 * Campo con solo borde inferior. La etiqueta va como `placeholder` para
 * replicar el mockup, y se repite en `aria-label` para no dejar el campo sin
 * nombre accesible.
 *
 * `border-fg-muted` y no `border-line`: sobre la superficie oliva ese token es
 * oliva claro, más oscuro que el fondo, y aquí el subrayado debe verse claro.
 */
export function UnderlineField({
  id,
  label,
  type = "text",
  multiline = false,
}: UnderlineFieldProps) {
  const className =
    "w-full bg-transparent border-0 border-b border-fg-muted pb-2 text-fg placeholder:text-fg-muted focus:border-accent focus:outline-none transition-colors duration-300 resize-none";

  if (multiline) {
    return (
      <textarea
        id={id}
        name={id}
        rows={1}
        placeholder={label}
        aria-label={label}
        className={className}
      />
    );
  }

  return (
    <input
      id={id}
      name={id}
      type={type}
      placeholder={label}
      aria-label={label}
      className={className}
    />
  );
}

export default UnderlineField;
