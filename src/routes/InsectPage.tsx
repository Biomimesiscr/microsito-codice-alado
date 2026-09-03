import { useParams } from "react-router";
import { InsectProjectPage } from "../components/insect/InsectProjectPage";
import { NotFoundPage } from "./NotFoundPage";
import { insects } from "../data/insects";

/**
 * Ruta dinámica `/insecto/:id`. Resuelve el slug contra el registro de
 * `src/data/insects/index.ts`; si no existe, cae al 404. Añadir una especie
 * nueva no toca este archivo — solo el registro de datos.
 */
export function InsectPage() {
  const { id } = useParams<{ id: string }>();
  const project = id ? insects[id] : undefined;

  if (!project) return <NotFoundPage />;

  return <InsectProjectPage project={project} />;
}

export default InsectPage;
