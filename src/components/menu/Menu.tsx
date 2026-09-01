import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Surface } from "../layout/Surface";
import { BackButton } from "../core/buttons/BackButton";
import type { DecorSlot } from "../decor/Decor";

const decor: DecorSlot[] = [
  {
    src: "/illustrations/menu.png",
    className:
      "top-1/2 -translate-y-1/2  left-[6%] h-[90vh] aspect-[500/500] text-fg opacity-90",
  },
];

export function Menu() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const menuItems = [
    { id: "species", label: t("menu.species") },
    { id: "about", label: t("menu.about") },
    { id: "contact", label: t("menu.contact") },
    { id: "community", label: t("menu.community") },
  ];

  const viewBoxSize = 500;
  const center = viewBoxSize / 2;
  const radius = 200;
  const circumference = 2 * Math.PI * radius;
  const segmentLength = circumference / 8;
  const dasharray = `${segmentLength} ${circumference - segmentLength}`;

  const angles = [-112.5, -157.5, -202.5, -247.5];
  const yPositions = angles.map(angle => {
    const rad = angle * (Math.PI / 180);
    return center + radius * Math.sin(rad);
  });

  // El color va por clases de Tailwind + `transition-colors`, no por Motion:
  // Motion no interpola variables CSS (escribe el `var()` tal cual y el cambio
  // saltaría). Motion sigue encargándose de escala, posición y grosor.

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -40, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
    },
  };

  return (
    <Surface tone="olive" decor={decor}>
      <BackButton to="/" />

      <div className="absolute inset-y-0 right-0 w-full flex items-center justify-end z-10 overflow-hidden">
        <div className="relative" style={{ width: viewBoxSize, height: viewBoxSize }}>

          <motion.ul
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="list-none p-0 m-0"
          >
            {menuItems.map((item, index) => {
              const isHovered = hoveredIndex === index;
              return (
                <motion.li
                  key={item.id}
                  variants={itemVariants}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="absolute right-[120px] md:right-[180px] lg:right-[220px] whitespace-nowrap z-20"
                  style={{
                    top: `${(yPositions[index] / viewBoxSize) * 100}%`,
                  }}
                >
                  <motion.h2
                    animate={{
                      scale: isHovered ? 1.08 : 1,
                      letterSpacing: isHovered ? "0.06em" : "0em",
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={`text-4xl md:text-5xl font-bold cursor-pointer select-none transition-colors duration-300 ${
                      isHovered ? "text-accent" : "text-fg"
                    }`}
                    onClick={() => navigate(`/${item.id}`)}
                  >
                    {item.label}
                  </motion.h2>

                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        exit={{ scaleX: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        className="h-[2px] mt-1 origin-left bg-accent"
                      />
                    )}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </motion.ul>

          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
            className="absolute top-0 right-0 translate-x-1/2 z-10"
          >
            {[...Array(4)].map((_, i) => {
              const rotation = -135 - (i * 45);
              const isHovered = hoveredIndex === i;
              return (
                <motion.circle
                  key={i}
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="none"
                  strokeDasharray={dasharray}
                  transform={`rotate(${rotation} ${center} ${center})`}
                  className={`cursor-pointer transition-[stroke] duration-300 ${
                    isHovered ? "stroke-fg-subtle" : "stroke-surface-raised"
                  }`}
                  initial={{ strokeWidth: 60 }}
                  animate={{ strokeWidth: isHovered ? 70 : 60 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              );
            })}
          </svg>
        </div>
      </div>
    </Surface>
  );
}

export default Menu;