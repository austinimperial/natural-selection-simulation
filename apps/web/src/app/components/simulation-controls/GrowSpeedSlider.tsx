'use client';

import Slider from '@repo/ui/Slider';
import React, { useContext } from 'react';
import { BugsContext } from '../../global-state/bugs/BugsProvider';

function GrowSpeedSlider() {
  const { growSpeed, setGrowSpeed } = useContext(BugsContext);

  const onChange = (newValue: number) => {
    setGrowSpeed(newValue);
  };

  return (
    <Slider
      min={0}
      max={10}
      step={0.5}
      value={growSpeed}
      name={'grow speed'}
      unit={'s'}
      onValueCommit={onChange}
      onValueChange={onChange}
    />
  );
}

export default GrowSpeedSlider;
