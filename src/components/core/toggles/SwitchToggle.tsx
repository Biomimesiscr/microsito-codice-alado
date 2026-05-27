import type { ComponentPropsWithoutRef } from "react";

export interface SwitchToggleProps
  extends Omit<ComponentPropsWithoutRef<"button">, "onChange"> {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export function SwitchToggle({
  checked,
  onChange,
  label,
  className = "",
  ...props
}: SwitchToggleProps) {
  const handleToggle = () => {
    onChange(!checked);
  };

  return (
    <label className={`inline-flex items-center gap-3 cursor-pointer select-none ${className}`}>
      {/* Visual Switch container button for accessibility */}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={handleToggle}
        className={`relative inline-flex h-7 w-13 shrink-0 items-center rounded-full border transition-all duration-300 ease-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/20 ${
          checked
            ? "bg-primary border-primary/50 shadow-[0_0_12px_rgba(28,67,74,0.4)]"
            : "bg-black/35 border-white/15 backdrop-blur-sm"
        }`}
        {...props}
      >
        {/* Sliding Thumb */}
        <span
          className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.3)] transition-all duration-300 ease-out ${
            checked ? "translate-x-7" : "translate-x-1"
          }`}
        />
      </button>
      
      {/* Optional Label */}
      {label && (
        <span className="text-sm font-medium tracking-wide text-white/80 font-sans hover:text-white transition-colors duration-200">
          {label}
        </span>
      )}
    </label>
  );
}

export default SwitchToggle;
