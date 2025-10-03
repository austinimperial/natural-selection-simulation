'use client';

import Slider from '@repo/ui/Slider';
import { useContext } from 'react';
import { BugsContext } from '../../providers/bugs/BugsProvider';

function PhenotypicDistanceSlider() {
  const { controlsForm } = useContext(BugsContext);

  const onChange = (newValue: number) => {
    controlsForm.setValue('phenotypicDistance', newValue);
  };

  return (
    <Slider
      min={0}
      max={15}
      step={1}
      form={controlsForm}
      field="phenotypicDistance"
      unit={''}
      tooltipContent="Controls how different each offprings will be from its parent"
      onValueCommit={onChange}
      onValueChange={onChange}
    />
  );
}

export default PhenotypicDistanceSlider;
