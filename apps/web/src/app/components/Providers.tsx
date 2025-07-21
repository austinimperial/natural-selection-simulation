'use client';

import React from 'react';
import BugsProvider from '../global-state/bugs/BugsProvider';
import BgImageProvider from '../global-state/bgImage/index';
import SvgDimensionsProvider from '../global-state/svgContainerDimensions/index';
import SnapshotsDisplayProvider from '../global-state/snapshotsDisplay/SnapshotDisplay';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <BgImageProvider>
      <SvgDimensionsProvider>
        <BugsProvider>
          <SnapshotsDisplayProvider>{children}</SnapshotsDisplayProvider>
        </BugsProvider>
      </SvgDimensionsProvider>
    </BgImageProvider>
  );
}
