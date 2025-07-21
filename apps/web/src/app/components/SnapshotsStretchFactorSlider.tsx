'use client';

import Slider from '@repo/ui/Slider';
import { useContext } from 'react';
import { SnapshotsDisplayContext } from '../global-state/snapshotsDisplay/SnapshotDisplay';

function StretchFactorSlider() {
  const { stretchFactor, setStretchFactor } = useContext(
    SnapshotsDisplayContext
  );

  const onChange = (newValue: number) => {
    setStretchFactor(newValue);
  };

  return (
    <Slider
      min={0.8}
      max={25}
      step={0.2}
      value={stretchFactor}
      name={'stretch factor'}
      unit=""
      onValueChange={onChange}
      onValueCommit={onChange}
    />
  );
}

export default StretchFactorSlider;
