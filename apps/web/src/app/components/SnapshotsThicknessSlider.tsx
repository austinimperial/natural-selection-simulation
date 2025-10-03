'use client';

import Slider from '@repo/ui/Slider';
import { useContext } from 'react';
import { SnapshotsContext } from '../providers/snapshots/SnapshotsProvider';

function ThicknessSlider() {
  const { snapshotsForm } = useContext(SnapshotsContext);

  return (
    <Slider
      min={0.1}
      max={1}
      step={0.1}
      form={snapshotsForm}
      field="thickness"
      unit={''}
    />
  );
}

export default ThicknessSlider;
