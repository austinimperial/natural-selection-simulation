'use client';

import Slider from '@repo/ui/Slider';
import { useContext } from 'react';
import { BugsContext } from '../../global-state/bugs/BugsProvider';

function PhenotypicDistanceSlider() {
  const { phenotypicDistance, setPhenotypicDistance } = useContext(BugsContext);

  const onChange = (newValue: number) => {
    setPhenotypicDistance(newValue);
  };

  return (
    <Slider
      min={0}
      max={15}
      step={1}
      value={phenotypicDistance}
      name={'phenotypic distance'}
      unit={''}
      tooltipContent="Controls how different each offprings will be from its parent"
      onValueCommit={onChange}
      onValueChange={onChange}
    />
  );
}

export default PhenotypicDistanceSlider;
