'use client';

import Slider from '@repo/ui/Slider';
import { useCallback, useContext } from 'react';
import { BugsContext } from '../../global-state/bugs/BugsProvider';
import { SvgDimensionsContext } from '../../global-state/svgContainerDimensions/index';

function PopulationSlider() {
  const {
    populationSize,
    setPopulationSize,
    bugSize,
    setPopulationSnapshots,
    setBugs,
    getInitialBugs,
    setStepCount,
  } = useContext(BugsContext);
  const { svgContainerDimensions } = useContext(SvgDimensionsContext);

  const handleValueCommit = useCallback(
    (newValue: number) => {
      const newbugs = getInitialBugs(svgContainerDimensions, newValue, bugSize);
      setBugs(newbugs);
      setPopulationSize(newValue);
      setPopulationSnapshots([]);
      setStepCount(0);
    },
    [
      svgContainerDimensions,
      bugSize,
      setPopulationSize,
      setPopulationSnapshots,
      setBugs,
      getInitialBugs,
      setStepCount,
    ]
  );

  const handleValueChange = useCallback(
    (newValue: number) => {
      setPopulationSize(newValue);
    },
    [setPopulationSize]
  );

  return (
    <Slider
      min={10}
      max={80}
      step={1}
      value={populationSize}
      name={'population'}
      unit=""
      tooltipContent="Total number of bugs present at any time. When you eat a bug, a surviving bug is randomly chosen to procreate. So the population stays constant."
      onValueCommit={handleValueCommit}
      onValueChange={handleValueChange}
    />
  );
}

export default PopulationSlider;
