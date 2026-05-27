import type { ComponentPropsWithoutRef } from "react";

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: "glass" | "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function Button({
  variant = "glass",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  // Core styling with transitions and active scale effect for responsiveness
  const baseStyles =
    "inline-flex items-center justify-center font-sans font-medium tracking-wide transition-all duration-350 ease-out focus:outline-none focus:ring-2 focus:ring-white/20 active:scale-97 cursor-pointer select-none";

  // Visual variants
  const variantStyles = {
    // Replicates the "menú" button in the mockup: premium glassmorphism
    glass:
      "bg-black/30 backdrop-blur-md border border-white/20 text-white rounded-full hover:bg-white/10 hover:border-white/40 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]",
    
    // Premium solid styling utilizing the theme's colors
    solid:
      "bg-primary text-white border border-primary/20 rounded-lg hover:bg-primary/90 hover:shadow-[0_4px_20px_rgba(28,67,74,0.3)] active:bg-primary/95",
    
    // Sleek border-only component
    outline:
      "bg-transparent border border-white/30 text-white rounded-lg hover:bg-white/10 hover:border-white/60",
    
    // Replicates the "Log In" button from the mockup
    ghost:
      "bg-transparent text-white/85 rounded-md hover:text-white hover:scale-103 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]",
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
