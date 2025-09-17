import cn from '@repo/utils/style/cn';
import { CircleAlert, CircleX, Info } from 'lucide-react';
import type { ReactNode } from 'react';

type Props = {
  variant: 'default' | 'warn' | 'error';
  buttonContent?: ReactNode;
  className?: string;
  children: ReactNode;
};

const variantMap = {
  default: 'border-blue-200 bg-blue-50 text-blue-900 shadow-sm',
  warn: 'border-amber-200 bg-amber-50 text-amber-900 shadow-sm',
  error: 'border-red-200 bg-red-50 text-red-900 shadow-sm',
} as const;

const iconMap = {
  default: Info,
  warn: CircleAlert,
  error: CircleX,
} as const;

const iconColorMap = {
  default: 'text-blue-600',
  warn: 'text-amber-600',
  error: 'text-red-600',
} as const;

export default function InfoBox({
  variant,
  buttonContent,
  className,
  children,
}: Props) {
  const Icon = iconMap[variant];

  return (
    <div
      className={cn(
        variantMap[variant],
        'flex items-start gap-4 rounded-lg border p-4 transition-colors',
        'focus-within:ring-2 focus-within:ring-offset-2 hover:shadow-md',
        variant === 'default' && 'focus-within:ring-blue-500',
        variant === 'warn' && 'focus-within:ring-amber-500',
        variant === 'error' && 'focus-within:ring-red-500',
        className
      )}
    >
      <Icon
        absoluteStrokeWidth
        strokeWidth={1.5}
        size={18}
        className={cn(iconColorMap[variant], 'mt-0.5 shrink-0')}
      />

      <div className="min-w-0 flex-1 text-sm leading-relaxed">{children}</div>

      {buttonContent && <div className="ml-2 shrink-0">{buttonContent}</div>}
    </div>
  );
}
