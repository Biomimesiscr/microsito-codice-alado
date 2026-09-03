/**
 * Registro de fichas de insecto, indexado por el slug de la URL
 * (`/insecto/:slug`). `InsectProject.id` es el prefijo de i18n
 * (`insects.<id>.*`) y no tiene por qué coincidir con el slug — aquí
 * "micro-avispas" (URL) resuelve a los datos con id "microAvispas" (i18n).
 *
 * Añadir una especie nueva es agregar un archivo
 * `src/data/insects/<slug>.tsx` y una línea aquí — ningún componente cambia.
 * Ver la guía "Cómo crear una ficha nueva" en `src/components/insect/README.md`.
 */
import type { InsectProject } from "../insectTypes";
import { microAvispas } from "./microAvispas";

export const insects: Record<string, InsectProject> = {
  "micro-avispas": microAvispas,
};
