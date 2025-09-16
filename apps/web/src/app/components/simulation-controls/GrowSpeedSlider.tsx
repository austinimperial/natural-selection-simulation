'use client';

import Slider from '@repo/ui/Slider';
import { useContext } from 'react';
import { BugsContext } from '../../providers/bugs/BugsProvider';

function GrowSpeedSlider() {
  const { controlsForm } = useContext(BugsContext);

  const onChange = (newValue: number) => {
    controlsForm.setValue('growSpeed', newValue);
  };

  return (
    <Slider
      min={0}
      max={10}
      step={0.5}
      value={controlsForm.watch('growSpeed')}
      name={'grow speed'}
      unit={'s'}
      tooltipContent="How long it takes a newborn bug to grow to full size"
      onValueCommit={onChange}
      onValueChange={onChange}
    />
  );
}

export default GrowSpeedSlider;
