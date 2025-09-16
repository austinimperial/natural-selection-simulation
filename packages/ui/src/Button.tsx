import cn from '@repo/utils/style/cn';
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
        'relative flex cursor-pointer appearance-none items-center justify-center border-1 border-black bg-white p-1 px-3',
        className
      )}
      {...rest}
    >
      {children}

      {isDisabled && (
        <div className="absolute inset-[-1px] flex items-center justify-center bg-white/30">
          {isLoading && <LoadingDots color={SPINNER_COLOR_MAP[variant]} />}
        </div>
      )}
    </button>
  );
}
