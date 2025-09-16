'use client';

import Slider from '@repo/ui/Slider';
import { useCallback, useContext } from 'react';
import { BugsContext } from '../../providers/bugs/BugsProvider';
import { SvgDimensionsContext } from '../../providers/svg-container/SvgContainerProvider.tsx';

function PopulationSlider() {
  const {
    controlsForm,
    setPopulationSnapshots,
    setBugs,
    getInitialBugs,
    setStepCount,
  } = useContext(BugsContext);

  const { populationSize, bugSize } = controlsForm.watch();

  const { svgContainerDimensions } = useContext(SvgDimensionsContext);

  const handleValueCommit = useCallback(
    (n: number) => {
      const newbugs = getInitialBugs(svgContainerDimensions, n, bugSize);
      setBugs(newbugs);
      controlsForm.setValue('populationSize', n);
      setPopulationSnapshots([]);
      setStepCount(0);
    },
    [
      svgContainerDimensions,
      bugSize,
      controlsForm,
      setPopulationSnapshots,
      setBugs,
      getInitialBugs,
      setStepCount,
    ]
  );

  const handleValueChange = (n: number) => {
    controlsForm.setValue('populationSize', n);
  };

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
