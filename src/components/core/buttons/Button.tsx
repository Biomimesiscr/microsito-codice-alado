import type { ComponentPropsWithoutRef } from "react";

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: "pill" | "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function Button({
  variant = "pill",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  // Core styling with transitions and active scale effect for responsiveness
  const baseStyles =
    "inline-flex items-center justify-center font-sans font-medium tracking-wide transition-all duration-350 ease-out focus:outline-none focus:ring-2 focus:ring-accent/30 active:scale-97 cursor-pointer select-none";

  // Visual variants — todo el color sale de la capa semántica de index.css
  const variantStyles = {
    // El botón "menú" del mockup: píldora arena con texto rust
    pill:
      "bg-surface-raised text-accent rounded-full hover:brightness-95 hover:shadow-[0_4px_16px_-6px_var(--color-fg)]",

    // Acento sólido para llamadas a la acción principales
    solid:
      "bg-accent text-surface border border-accent rounded-lg hover:brightness-110 active:brightness-95",

    // Sleek border-only component
    outline:
      "bg-transparent border border-line text-fg rounded-lg hover:bg-surface-raised hover:border-accent",

    // El botón "Log In" del mockup
    ghost:
      "bg-transparent text-fg-muted rounded-md hover:text-accent hover:scale-103",
  };

  // Standard sizes
  const sizeStyles = {
    sm: "px-4 py-1.5 text-xs sm:text-sm",
    md: "px-8 py-3 text-sm sm:text-base",
    lg: "px-10 py-4 text-base sm:text-lg",
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`.trim();

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
}

export default Button;
