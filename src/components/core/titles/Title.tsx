import type { ComponentPropsWithoutRef, JSX } from "react";

export interface TitleProps extends ComponentPropsWithoutRef<"h1"> {
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  variant?: "primary" | "secondary" | "accent";
  glow?: boolean;
}

export function Title({
  tag = "h2",
  variant = "primary",
  glow = false,
  className = "",
  children,
  ...props
}: TitleProps) {
  const Tag = tag as keyof JSX.IntrinsicElements;

  // Base styles for clean typography matching the DM Sans configuration
  const baseStyles = "font-sans tracking-wide transition-all duration-300";

  // Variant mappings based on visual hierarchy in the screenshot
  const variantStyles = {
    primary: "text-white font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight",
    secondary: "text-white/95 font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-snug",
    accent: "text-tertiary font-bold text-3xl sm:text-4xl md:text-5xl leading-tight",
  };

  // Premium glow effect: text-shadow using css variables or standard styles
  const glowStyles = glow
    ? "drop-shadow-[0_0_12px_rgba(255,255,255,0.35)]"
    : "";

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${glowStyles} ${className}`.trim();

  return (
    <Tag className={combinedClassName} {...props}>
      {children}
    </Tag>
  );
}

export default Title;
