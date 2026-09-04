import { useEffect } from "react";
import { useLocation } from "react-router";
import { init } from "@webdots/annotate-client";

const API_URL = import.meta.env.VITE_WEBDOTS_API_URL as string | undefined;
const API_KEY = import.meta.env.VITE_WEBDOTS_API_KEY as string | undefined;

/**
 * Monta el widget de anotación visual de Webdots. Sin VITE_WEBDOTS_API_URL el
 * componente no hace nada, así que producción queda limpia por defecto.
 *
 * El widget resuelve su `pageKey` una sola vez, en `init()`, contra el
 * `location` actual; por eso lo remontamos en cada cambio de ruta en lugar de
 * llamar a `refresh()`.
 */
export function AnnotateWidget() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!API_URL) return;

    const widget = init({
      apiUrl: API_URL,
      apiKey: API_KEY,

    });

    return () => widget.destroy();
  }, [pathname]);

  return null;
}
