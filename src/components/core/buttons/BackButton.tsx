import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

export interface BackButtonProps {
  /** Ruta destino, o un delta de historial. Por defecto `-1` (atrás). */
  to?: string | number;
  className?: string;
}

/**
 * Botón de volver de la esquina superior izquierda, compartido por Menu,
 * InfographyLayout y Contact.
 */
export function BackButton({ to = -1, className = "" }: BackButtonProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Se ramifica en vez de pasar la unión directamente: `navigate` tiene
  // sobrecargas distintas para ruta y para delta de historial.
  const handleClick = () => {
    if (typeof to === "number") {
      navigate(to);
    } else {
      navigate(to);
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      className={`absolute top-8 left-8 z-50 p-3 text-fg-muted hover:text-accent transition-colors duration-300 cursor-pointer ${className}`.trim()}
      aria-label={t("menu.back")}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </motion.button>
  );
}

export default BackButton;
