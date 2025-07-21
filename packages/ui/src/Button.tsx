import { cn } from '@repo/utils';
import { ChevronRight } from 'lucide-react';
import type React from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { LoadingDotsProps } from './LoadingDots';
import LoadingDots from './LoadingDots';

export type ButtonVariant = 'default';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
  isLoading?: boolean;
  children: ReactNode;
}

const BUTTON_STYLES: Record<ButtonVariant, string> = {
  default: 'bg-white border border-black text-black px-2',
};

const SPINNER_COLOR_MAP: Record<ButtonVariant, LoadingDotsProps['color']> = {
  default: 'black',
};

const isLinkStyle = (variant: ButtonVariant) => variant.endsWith('link');

export default function Button({
  type = 'button',
  variant,
  isLoading = false,
  disabled = false,
  className,
  children,
  ...rest
}: Props): React.JSX.Element {
  const isDisabled = isLoading || disabled;
  return (
    <button
      type={type}
      disabled={isDisabled}
      className={cn(
        BUTTON_STYLES[variant],
        'relative cursor-pointer items-center justify-center h-6 text-sm appearance-none rounded-0',
        isLinkStyle(variant) && '',
        className
      )}
      {...rest}
    >
      {children}

      {isLinkStyle(variant) && (
        <ChevronRight
          absoluteStrokeWidth
          strokeWidth={1.5}
          size={16}
          className="ml-1 transition group-hover:translate-x-1"
        />
      )}

      {isDisabled && (
        <div className="absolute inset-[-1px] flex items-center justify-center bg-white/30">
          {isLoading && <LoadingDots color={SPINNER_COLOR_MAP[variant]} />}
        </div>
      )}
    </button>
  );
}
