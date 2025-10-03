'use client';

import Slider from '@repo/ui/Slider';
import { useContext } from 'react';
import { SnapshotsContext } from '../providers/snapshots/SnapshotsProvider';

function StretchFactorSlider() {
  const { snapshotsForm } = useContext(SnapshotsContext);

  return (
    <Slider
      min={1}
      max={25}
      step={0.1}
      form={snapshotsForm}
      field="stretchFactor"
      unit=""
    />
  );
}

export default StretchFactorSlider;
