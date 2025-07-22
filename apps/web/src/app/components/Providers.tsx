'use client';

import type React from 'react';
import BgImageProvider from '../global-state/bgImage/index';
import BugsProvider from '../global-state/bugs/BugsProvider';
import SvgDimensionsProvider from '../global-state/svgContainerDimensions/index';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <BgImageProvider>
      <SvgDimensionsProvider>
        <BugsProvider>{children}</BugsProvider>
      </SvgDimensionsProvider>
    </BgImageProvider>
  );
}
