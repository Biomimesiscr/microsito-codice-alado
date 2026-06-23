import type { ComponentPropsWithoutRef } from "react";
import { motion } from "framer-motion";

export interface AnimatedHeaderProps
  extends ComponentPropsWithoutRef<typeof motion.header> {
  delay?: number;
  duration?: number;
}

export function AnimatedHeader({
  delay = 0,
  duration = 0.7,
  children,
  className = "",
  ...props
}: AnimatedHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.header>
  );
}

export default AnimatedHeader;