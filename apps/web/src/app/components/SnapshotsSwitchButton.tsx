'use client';

import Toggle from '@repo/ui/Toggle';
import { useContext } from 'react';
import type { SnapshotDisplayType } from '../providers/snapshots/SnapshotsProvider';
import { SnapshotsContext } from '../providers/snapshots/SnapshotsProvider';

function SnapshotSwitchButton() {
  const { setSnapshotDisplayType, snapshotDisplayType } =
    useContext(SnapshotsContext);

  return (
    <div className="my-5 min-w-[60px]">
      <Toggle
        value={snapshotDisplayType}
        onValueChange={(value) =>
          setSnapshotDisplayType(value as SnapshotDisplayType)
        }
        right={{
          label: 'grid',
          value: 'canvas',
        }}
        left={{
          label: 'lines',
          value: 'svg',
        }}
      />
    </div>
  );
}

export default SnapshotSwitchButton;
