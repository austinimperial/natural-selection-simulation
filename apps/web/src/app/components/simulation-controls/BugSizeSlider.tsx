'use client';

import Slider from '@repo/ui/Slider';
import { useContext } from 'react';
import { BugsContext } from '../../global-state/bugs/BugsProvider';

function BugSizeSlider() {
  const { setBugSize, bugSize } = useContext(BugsContext);

  const onChange = (newValue: number) => {
    setBugSize(newValue);
  };

  return (
    <Slider
      min={4}
      max={70}
      step={2}
      value={bugSize}
      name={'bug size'}
      unit={'px'}
      tooltipContent="Controls the size of the bugs. Smaller bugs are harder to spot, making the game more challenging and encouraging hunting based on color visibility."
      onValueCommit={onChange}
      onValueChange={onChange}
    />
  );
}

export default BugSizeSlider;
