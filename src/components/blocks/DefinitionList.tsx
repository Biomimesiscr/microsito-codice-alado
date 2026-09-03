export interface DefinitionEntry {
  label: string;
  value: string;
}

export interface DefinitionListProps {
  entries: DefinitionEntry[];
}

/**
 * Pares etiqueta/valor (p. ej. taxonomía: Orden → Hymenoptera). `<dl>`
 * semántico: la etiqueta es la clave pequeña, el valor es el dato grande.
 */
export function DefinitionList({ entries }: DefinitionListProps) {
  return (
    <dl className="flex flex-col gap-5">
      {entries.map((entry) => (
        <div key={entry.label}>
          <dt className="text-sm tracking-wide text-fg-subtle uppercase">{entry.label}</dt>
          <dd className="mt-1 text-xl font-medium text-fg md:text-2xl">{entry.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default DefinitionList;
