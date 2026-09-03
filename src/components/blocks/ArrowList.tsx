import { ArrowIcon } from "../core/icons/ArrowIcon";

export interface ArrowListItem {
  text: string;
  /** Si falta, el item se renderiza como texto plano (no todos los artículos
   * relacionados tienen enlace en el diseño). */
  href?: string;
}

export interface ArrowListProps {
  items: (string | ArrowListItem)[];
  columns?: 1 | 2;
}

// Mapa literal para que el escáner de Tailwind vea la clase completa.
const columnStyles = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
} as const;

/** Normaliza un item de string u objeto a la forma completa. */
function normalize(item: string | ArrowListItem): ArrowListItem {
  return typeof item === "string" ? { text: item } : item;
}

/**
 * Lista con viñeta de flecha (`ArrowIcon`), a 1 o 2 columnas. La reutilizan
 * Género/Especie (sin enlace) y Artículos relacionados (con enlace externo).
 */
export function ArrowList({ items, columns = 1 }: ArrowListProps) {
  return (
    <ul className={`grid gap-x-8 gap-y-4 ${columnStyles[columns]}`}>
      {items.map((raw) => {
        const item = normalize(raw);
        return (
          <li key={item.text} className="flex items-start gap-3">
            <ArrowIcon className="mt-2 h-[6px] w-[20px] shrink-0 text-accent" />
            {item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="text-fg underline decoration-line underline-offset-4 transition-colors duration-300 hover:text-accent"
              >
                {item.text}
              </a>
            ) : (
              <span className="text-fg">{item.text}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default ArrowList;
