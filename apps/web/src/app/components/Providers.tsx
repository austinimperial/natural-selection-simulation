'use client';

import type React from 'react';
import BgImageProvider from '../global-state/bgImage/index';
import BugsProvider from '../global-state/bugs/BugsProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <BgImageProvider>
      <BugsProvider>{children}</BugsProvider>
    </BgImageProvider>
  );
}
