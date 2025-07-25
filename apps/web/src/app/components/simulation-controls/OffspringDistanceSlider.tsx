'use client';

import Slider from '@repo/ui/Slider';
import { useContext } from 'react';
import { BugsContext } from '../../global-state/bugs/BugsProvider';

function OffspringDistanceSlider() {
  const { setmaxOffspringRadius, maxOffspringRadius } = useContext(BugsContext);

  const onChange = (newValue: number) => {
    setmaxOffspringRadius(newValue);
  };

  return (
    <Slider
      min={10}
      max={500}
      step={5}
      value={maxOffspringRadius}
      name={'max offspring radius'}
      unit={'px'}
      onValueCommit={onChange}
      onValueChange={onChange}
    />
  );
}

export default OffspringDistanceSlider;
