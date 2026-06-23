import type { ComponentPropsWithoutRef } from "react";
import { motion } from "framer-motion";

export interface AnimatedSectionProps
  extends ComponentPropsWithoutRef<typeof motion.div> {
  delay?: number;
  duration?: number;
  yOffset?: number;
}

export function AnimatedSection({
  delay = 0,
  duration = 0.9,
  yOffset = 30,
  children,
  className = "",
  ...props
}: AnimatedSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      animate={{ opacity: 1, y: 0 }}
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

export default AnimatedSection;