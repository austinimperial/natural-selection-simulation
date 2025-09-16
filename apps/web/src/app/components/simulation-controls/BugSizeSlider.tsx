'use client';

import Slider from '@repo/ui/Slider';
import { useContext } from 'react';
import { BugsContext } from '../../providers/bugs/BugsProvider';

function BugSizeSlider() {
  const { controlsForm } = useContext(BugsContext);
  const { bugSize } = controlsForm.watch();

  const onChange = (newValue: number) => {
    controlsForm.setValue('bugSize', newValue);
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
