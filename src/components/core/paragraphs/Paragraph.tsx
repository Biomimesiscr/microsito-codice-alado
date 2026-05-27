import type { ComponentPropsWithoutRef } from "react";

export interface ParagraphProps extends ComponentPropsWithoutRef<"p"> {
  variant?: "body" | "lead" | "muted";
}

export function Paragraph({
  variant = "body",
  className = "",
  children,
  ...props
}: ParagraphProps) {
  // Base paragraph typography properties matching the DM Sans visual language
  const baseStyles = "font-sans leading-relaxed transition-colors duration-300";

  // Variant mappings for different body text purposes
  const variantStyles = {
    body: "text-white/85 text-base sm:text-lg font-light tracking-wide max-w-3xl",
    lead: "text-white/95 text-lg sm:text-xl font-normal tracking-wide max-w-4xl",
    muted: "text-white/55 text-xs sm:text-sm font-light tracking-wide",
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`.trim();

  return (
    <p className={combinedClassName} {...props}>
      {children}
    </p>
  );
}

export default Paragraph;
