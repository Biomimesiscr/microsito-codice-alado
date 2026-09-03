import { useCallback, useState, type KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowIcon } from "../icons/ArrowIcon";

export interface ImageCarouselSlide {
  src: string;
  alt?: string;
}

export interface ImageCarouselProps {
  slides: ImageCarouselSlide[];
  initial?: number;
  className?: string;
}

/**
 * Carrusel "coverflow": la lámina activa grande y centrada, las vecinas
 * encogidas y atenuadas a los lados. No hay librería de carrusel en el
 * repo, así que el desplazamiento es estado local (`useState`) +
 * `framer-motion` para las transiciones de tamaño/opacidad.
 */
export function ImageCarousel({ slides, initial = 0, className = "" }: ImageCarouselProps) {
  const [index, setIndex] = useState(initial);

  const go = useCallback((delta: number) => {
    setIndex((current) => (current + delta + slides.length) % slides.length);
  }, [slides.length]);

  // Flechas del teclado, pero solo con el carrusel enfocado: en `window` el
  // listener secuestraba ←/→ en toda la página, incluso con el carrusel fuera
  // de pantalla, y chocaba con la navegación de la infografía embebida.
  const handleKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") go(-1);
    if (event.key === "ArrowRight") go(1);
  };

  if (slides.length === 0) return null;

  return (
    <div
      className={`relative flex items-center justify-center gap-2 outline-none sm:gap-4 ${className}`.trim()}
      tabIndex={0}
      onKeyDown={handleKey}
      role="region"
      aria-roledescription="carousel"
    >
      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="Anterior"
        className="shrink-0 p-2 text-fg-muted transition-colors duration-300 hover:text-accent cursor-pointer"
      >
        <ArrowIcon className="h-[10px] w-[34px] rotate-180" />
      </button>

      <div className="relative flex h-[220px] flex-1 items-center justify-center overflow-hidden sm:h-[320px] md:h-[420px]">
        <AnimatePresence initial={false} mode="popLayout">
          {slides.map((slide, slideIndex) => {
            // Distancia circular al slide activo, para decidir escala/opacidad
            // sin depender del orden lineal del array.
            const distance = Math.min(
              Math.abs(slideIndex - index),
              slides.length - Math.abs(slideIndex - index),
            );
            if (distance > 1) return null;

            const isActive = distance === 0;
            const offset = (() => {
              const forward = (slideIndex - index + slides.length) % slides.length;
              return forward <= slides.length / 2 ? forward : forward - slides.length;
            })();

            return (
              <motion.img
                key={slide.src}
                src={slide.src}
                alt={slide.alt ?? ""}
                initial={false}
                animate={{
                  x: `${offset * 70}%`,
                  scale: isActive ? 1 : 0.75,
                  opacity: isActive ? 1 : 0.45,
                  zIndex: isActive ? 10 : 1,
                }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute h-full w-[70%] rounded-[32px] object-cover sm:w-[55%] md:w-[46%]"
              />
            );
          })}
        </AnimatePresence>
      </div>

      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Siguiente"
        className="shrink-0 p-2 text-fg-muted transition-colors duration-300 hover:text-accent cursor-pointer"
      >
        <ArrowIcon className="h-[10px] w-[34px]" />
      </button>
    </div>
  );
}

export default ImageCarousel;
