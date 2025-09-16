'use client';
import cn from '@repo/utils/style/cn';
import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavItemProps = {
  text: string;
  path: string;
  IconComponent?: LucideIcon;
  className?: string;
};

export default function NavItem({
  text,
  path,
  IconComponent,
  className,
}: NavItemProps) {
  const pathname = usePathname()!;

  const pathWithoutQuery = path.split('?')[0];
  const isActive = path && pathname === pathWithoutQuery;
  const isExactMatch = pathname === pathWithoutQuery;

  return (
    <div
      data-testid="main-nav-item"
      className={cn(
        className,
        'flex h-6 items-center gap-3 border-r-[3px] border-transparent'
      )}
    >
      {IconComponent && (
        <IconComponent
          absoluteStrokeWidth
          strokeWidth={1.5}
          size={20}
          className={cn(
            'h-6 w-6 brightness-75',
            isActive ? 'text-gray-900' : 'text-gray-400'
          )}
        />
      )}

      <Link
        href={path}
        className={cn('text-sm text-gray-700', {
          'pointer-events-none': isExactMatch,
          underline: isActive,
        })}
      >
        {text}
      </Link>
    </div>
  );
}
