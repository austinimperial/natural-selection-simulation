import { cn } from '@repo/utils';
import { CircleAlert, CircleX, Info } from 'lucide-react';
import type { ReactNode } from 'react';

type Props = {
  variant: 'default' | 'warn' | 'error';
  buttonContent?: ReactNode;
  className?: string;
  children: ReactNode;
};

const variantMap = {
  default: 'border-blue-500 bg-blue-100 text-gray-700',
  warn: 'border-orange-500 bg-orange-100 text-gray-700',
  error: 'border-red-500 bg-red-100 text-gray-700',
} as const;

const iconMap = {
  default: Info,
  warn: CircleAlert,
  error: CircleX,
} as const;

const iconColorMap = {
  default: 'text-blue-500',
  warn: 'text-orange-500',
  error: 'text-red-500',
} as const;

export default function InfoBox({
  variant,
  buttonContent,
  className,
  children,
}: Props) {
  const IconComponent = iconMap[variant];

  return (
    <div
      data-testid="info-box"
      className={cn(
        variantMap[variant],
        'rounded-md border-l-4 p-3 flex items-start gap-3',
        className
      )}
    >
      <IconComponent
        absoluteStrokeWidth
        strokeWidth={1.5}
        size={16}
        className={cn(iconColorMap[variant], 'mt-0.5 shrink-0')}
      />

      <div className="grow">{children}</div>

      <div className="shrink-0">{buttonContent}</div>
    </div>
  );
}
