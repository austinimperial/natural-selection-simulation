'use client';

import Slider from '@repo/ui/Slider';
import React, { useContext } from 'react';
import { BugsContext } from '../../global-state/bugs/BugsProvider';

function OffspringDistanceSlider() {
  const { setMaxOffspringDistance, maxOffspringDistance } =
    useContext(BugsContext);

  const onChange = (newValue: number) => {
    setMaxOffspringDistance(newValue);
  };

  return (
    <Slider
      min={10}
      max={500}
      step={5}
      value={maxOffspringDistance}
      name={'max offspring distance'}
      unit={'px'}
      onValueCommit={onChange}
      onValueChange={onChange}
    />
  );
}

export default OffspringDistanceSlider;
