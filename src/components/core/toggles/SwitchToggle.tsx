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
        className={`relative inline-flex h-7 w-13 shrink-0 items-center rounded-full border transition-all duration-300 ease-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/30 ${
          checked
            ? "bg-accent border-accent"
            : "bg-surface-raised border-line"
        }`}
        {...props}
      >
        {/* Sliding Thumb */}
        <span
          className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-surface shadow-[0_1px_4px_-1px_var(--color-fg)] transition-all duration-300 ease-out ${
            checked ? "translate-x-7" : "translate-x-1"
          }`}
        />
      </button>
      
      {/* Optional Label */}
      {label && (
        <span className="text-sm font-medium tracking-wide text-fg-muted font-sans hover:text-fg transition-colors duration-200">
          {label}
        </span>
      )}
    </label>
  );
}

export default SwitchToggle;
