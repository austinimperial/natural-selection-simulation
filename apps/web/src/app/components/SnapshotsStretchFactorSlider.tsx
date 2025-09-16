'use client';

import Slider from '@repo/ui/Slider';
import { useContext } from 'react';
import { SnapshotsContext } from '../providers/snapshots/SnapshotsProvider';

function StretchFactorSlider() {
  const { stretchFactor, setStretchFactor } = useContext(SnapshotsContext);

  const onChange = (newValue: number) => {
    setStretchFactor(newValue);
  };

  return (
    <Slider
      min={1}
      max={25}
      step={0.1}
      value={stretchFactor}
      name={'stretch factor'}
      unit=""
      onValueChange={onChange}
      onValueCommit={onChange}
    />
  );
}

export default StretchFactorSlider;
