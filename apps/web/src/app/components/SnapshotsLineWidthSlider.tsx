'use client';

import Slider from '@repo/ui/Slider';
import { useContext } from 'react';
import { SnapshotsContext } from '../providers/snapshots/SnapshotsProvider';

function LineWidthSlider() {
  const { snapshotsForm } = useContext(SnapshotsContext);

  return (
    <Slider
      min={0.1}
      max={15}
      step={0.1}
      form={snapshotsForm}
      field="lineWidth"
      unit=""
    />
  );
}

export default LineWidthSlider;
