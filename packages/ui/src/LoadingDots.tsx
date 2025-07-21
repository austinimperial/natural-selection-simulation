import { cn } from "@repo/utils";

export type LoadingDotsProps = {
  color?: "gray" | "white" | "black";
  size?: 16 | 24 | 36;
  className?: string;
};

const colorMap = {
  gray: "text-gray-600",
  white: "text-white",
  black: "text-gray-900",
} as const;

/**
 * Dots loading dots component.
 */
export default function LoadingDots({
  color = "black",
  size = 24,
  className,
}: LoadingDotsProps) {
  return (
    <svg
      aria-label="Loading Dots"
      role="img"
      className={cn(className, colorMap[color])}
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 120 30"
      preserveAspectRatio="xMidYMid"
    >
      <circle cx="15" cy="15" r="15" fill="currentColor">
        <animate
          attributeName="r"
          from="15"
          to="15"
          values="15;9;15"
          dur="0.8s"
          repeatCount="indefinite"
          begin="0s"
        />
      </circle>
      <circle cx="60" cy="15" r="9" fill="currentColor">
        <animate
          attributeName="r"
          from="9"
          to="9"
          values="9;15;9"
          dur="0.8s"
          repeatCount="indefinite"
          begin="0.2s"
        />
      </circle>
      <circle cx="105" cy="15" r="15" fill="currentColor">
        <animate
          attributeName="r"
          from="15"
          to="15"
          values="15;9;15"
          dur="0.8s"
          repeatCount="indefinite"
          begin="0.4s"
        />
      </circle>
    </svg>
  );
}
