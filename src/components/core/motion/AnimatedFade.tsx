import type { ComponentPropsWithoutRef } from "react";
import { motion } from "framer-motion";

export interface AnimatedFadeProps
  extends ComponentPropsWithoutRef<typeof motion.div> {
  delay?: number;
  duration?: number;
  scale?: number;
}

export function AnimatedFade({
  delay = 0,
  duration = 0.9,
  scale,
  children,
  className = "",
  ...props
}: AnimatedFadeProps) {
  const initial = scale !== undefined
    ? { opacity: 0, scale }
    : { opacity: 0 };

  const animate = scale !== undefined
    ? { opacity: 1, scale: 1 }
    : { opacity: 1 };

  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default AnimatedFade;