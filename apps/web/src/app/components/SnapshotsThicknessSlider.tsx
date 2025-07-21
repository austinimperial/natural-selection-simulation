'use client';

import Slider from '@repo/ui/Slider';
import { useContext } from 'react';
import { SnapshotsDisplayContext } from '../global-state/snapshotsDisplay/SnapshotDisplay';

function ThicknessSlider() {
  const { thickness, setThickness } = useContext(SnapshotsDisplayContext);

  const handleValueCommit = (newValue: number) => {
    setThickness(newValue);
  };

  const handleValueChange = (newValue: number) => {
    setThickness(newValue);
  };

  return (
    <Slider
      min={0.1}
      max={1}
      step={0.1}
      value={thickness}
      name={'thickness'}
      unit={''}
      onValueCommit={handleValueCommit}
      onValueChange={handleValueChange}
    />
  );
}

export default ThicknessSlider;
