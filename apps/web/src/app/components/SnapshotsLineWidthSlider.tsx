'use client';

import Slider from '@repo/ui/Slider';
import { useContext } from 'react';
import { SnapshotsDisplayContext } from '../global-state/snapshotsDisplay/SnapshotDisplay';

function LineWidthSlider() {
  const { lineWidth, setLineWidth } = useContext(SnapshotsDisplayContext);

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
