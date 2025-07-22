'use client';

import Slider from '@repo/ui/Slider';
import { useContext } from 'react';
import { BugsContext } from '../../global-state/bugs/BugsProvider';

function HungerTimerSlider() {
  const { hungerTimer, setHungerTimer } = useContext(BugsContext);

  const onChange = (newValue: number) => {
    setHungerTimer(newValue);
  };

  return (
    <Slider
      min={0.5}
      max={5}
      step={0.1}
      value={hungerTimer}
      name={'hunger timer (seconds)'}
      unit="s"
      onValueChange={onChange}
      onValueCommit={onChange}
    />
  );
}

export default HungerTimerSlider;
