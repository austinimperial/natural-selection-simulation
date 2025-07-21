'use client';

import Slider from '@repo/ui/Slider';
import React, { useContext } from 'react';
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
      onValueCommit={onChange}
      onValueChange={onChange}
    />
  );
}

export default BugSizeSlider;
