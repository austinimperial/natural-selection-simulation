'use client';

import Slider from '@repo/ui/Slider';
import { useContext } from 'react';
import { SnapshotsContext } from '../providers/snapshots/SnapshotsProvider';

function LineWidthSlider() {
  const { lineWidth, setLineWidth } = useContext(SnapshotsContext);

  const onChange = (newValue: number) => {
    setLineWidth(newValue);
  };

  return (
    <Slider
      min={0.1}
      max={15}
      step={0.1}
      value={lineWidth}
      name={'line width'}
      unit=""
      onValueChange={onChange}
      onValueCommit={onChange}
    />
  );
}

export default LineWidthSlider;
