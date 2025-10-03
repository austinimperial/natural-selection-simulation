import cn from '@repo/utils/style/cn';
import type React from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import LoadingDots from './LoadingDots';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children: ReactNode;
}

export default function Button({
  type = 'button',
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
        'bg-white border border-black text-black px-2',
        'relative flex cursor-pointer appearance-none items-center justify-center border-1 border-black bg-white p-1 px-3',
        className
      )}
      {...rest}
    >
      {children}

      {isDisabled && (
        <div className="absolute inset-[-1px] flex items-center justify-center bg-white/30">
          {isLoading && <LoadingDots color="black" />}
        </div>
      )}
    </button>
  );
}
