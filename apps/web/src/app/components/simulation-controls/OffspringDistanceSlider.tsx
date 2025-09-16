'use client';

import Slider from '@repo/ui/Slider';
import { useContext } from 'react';
import { BugsContext } from '../../providers/bugs/BugsProvider';

function MaxOffspringRadiusSlider() {
  const { controlsForm } = useContext(BugsContext);

  const onChange = (newValue: number) => {
    controlsForm.setValue('maxOffspringRadius', newValue);
  };

  return (
    <Slider
      min={10}
      max={500}
      step={5}
      value={controlsForm.watch('maxOffspringRadius')}
      name={'max offspring radius'}
      unit={'px'}
      tooltipContent="This is the maximum distance that an offspring bug will spawn from its parent."
      onValueCommit={onChange}
      onValueChange={onChange}
    />
  );
}

export default MaxOffspringRadiusSlider;
