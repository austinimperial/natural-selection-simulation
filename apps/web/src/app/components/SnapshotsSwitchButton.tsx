'use client';

import Toggle from '@repo/ui/Toggle';
import { useContext } from 'react';
import { SnapshotsDisplayContext } from '../global-state/snapshotsDisplay/SnapshotDisplay';

function SnapshotSwitchButton() {
  const { setDisplaySvg, isShowingSvg } = useContext(SnapshotsDisplayContext);

  return (
    <div className="my-5 min-w-[60px]">
      <Toggle
        value={isShowingSvg}
        onValueChange={setDisplaySvg}
        leftLabel="grid"
        rightLabel="lines"
      />
    </div>
  );
}

export default SnapshotSwitchButton;
