import { useEffect, useRef, useState } from "react";
import type { ComponentPropsWithoutRef } from "react";

export interface ToggleOption {
  value: string;
  label: string;
}

export interface SegmentedToggleProps
  extends Omit<ComponentPropsWithoutRef<"div">, "onChange"> {
  options: ToggleOption[];
  value: string;
  onChange: (value: string) => void;
}

export function SegmentedToggle({
  options,
  value,
  onChange,
  className = "",
  ...props
}: SegmentedToggleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const [indicatorStyle, setIndicatorStyle] = useState<{
    left: number;
    width: number;
  }>({ left: 0, width: 0 });

  // Update sliding indicator position based on selected button bounding box
  useEffect(() => {
    const activeBtn = buttonRefs.current[value];
    if (activeBtn) {
      setIndicatorStyle({
        left: activeBtn.offsetLeft,
        width: activeBtn.offsetWidth,
      });
    }
  }, [value, options]);

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex items-center p-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full select-none ${className}`}
      {...props}
    >
      {/* Sliding background indicator */}
      <span
        className="absolute top-1 bottom-1 bg-white rounded-full transition-all duration-350 ease-out shadow-[0_2px_10px_rgba(255,255,255,0.1)]"
        style={{
          left: `${indicatorStyle.left}px`,
          width: `${indicatorStyle.width}px`,
        }}
      />

      {/* Segment options */}
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <button
            key={option.value}
            ref={(el) => {
              buttonRefs.current[option.value] = el;
            }}
            type="button"
            onClick={() => onChange(option.value)}
            className={`relative z-10 px-5 py-1.5 text-sm font-medium tracking-wide rounded-full transition-colors duration-300 cursor-pointer focus:outline-none ${
              isActive
                ? "text-secondary font-bold"
                : "text-white/60 hover:text-white"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default SegmentedToggle;
