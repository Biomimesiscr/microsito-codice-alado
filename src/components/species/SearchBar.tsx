import { useTranslation } from "react-i18next";

/**
 * TODO: solo maquetado. Escribir aquí todavía no filtra nada; conectarlo es
 * subir el valor a estado en `Species` y filtrar `speciesCategories` por
 * nombre y subtítulo. El icono de filtro tampoco tiene acción asociada.
 */
export function SearchBar() {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-2 rounded-full border border-line bg-surface-raised px-4 py-2 w-full max-w-xs">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shrink-0 text-fg-subtle"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3.5-3.5" />
      </svg>

      <input
        type="search"
        placeholder={t("species.search")}
        aria-label={t("species.search")}
        className="min-w-0 flex-1 bg-transparent text-sm text-fg placeholder:text-fg-subtle focus:outline-none"
      />

      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shrink-0 text-fg-subtle"
        aria-hidden="true"
      >
        <path d="M4 7h11M18 7h2M4 17h2M9 17h11" />
        <circle cx="16" cy="7" r="2" />
        <circle cx="7" cy="17" r="2" />
      </svg>
    </div>
  );
}

export default SearchBar;
