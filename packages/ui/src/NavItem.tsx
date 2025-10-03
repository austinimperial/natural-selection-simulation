'use client';
import cn from '@repo/utils/style/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavItemProps = {
  text: string;
  path: string;
  className?: string;
};

export default function NavItem({ text, path, className }: NavItemProps) {
  const pathname = usePathname()!;

  const pathWithoutQuery = path.split('?')[0];
  const isActive = path && pathname === pathWithoutQuery;
  const isExactMatch = pathname === pathWithoutQuery;

  return (
    <div
      className={cn(
        className,
        'flex h-6 items-center gap-3 border-r-[3px] border-transparent'
      )}
    >
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
