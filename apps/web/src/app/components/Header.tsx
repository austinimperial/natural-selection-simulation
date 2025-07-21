'use client';

import Button from '@repo/ui/Button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Header() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col flex-wrap items-center justify-center">
      <h1 className="text-center">Bug Hunt Camouflage</h1>
      <p className="text-center text-xl">
        A tool for understanding the process of natural selection
      </p>

      {pathname === '/' && (
        <Button variant="default">
          <Link href="/info">
            <p>Info</p>
          </Link>
        </Button>
      )}

      {pathname === '/info' && (
        <Button variant="default">
          <Link href="/">
            <p>Home</p>
          </Link>
        </Button>
      )}
    </div>
  );
}

export default Header;
