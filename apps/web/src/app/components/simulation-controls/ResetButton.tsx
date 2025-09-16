'use client';

import Button from '@repo/ui/Button';
import { useContext } from 'react';
import { BugsContext } from '../../providers/bugs/BugsProvider';
import { SnapshotsContext } from '../../providers/snapshots/SnapshotsProvider';
import { SvgDimensionsContext } from '../../providers/svg-container/SvgContainerProvider.tsx';

function ResetButton() {
  const {
    controlsForm,
    setPopulationSnapshots,
    setBugs,
    getInitialBugs,
    setStepCount,
    setDeaths,
  } = useContext(BugsContext);
  const { populationSize, bugSize } = controlsForm.watch();
  const { svgContainerDimensions } = useContext(SvgDimensionsContext);
  const { resetCanvasDimens } = useContext(SnapshotsContext);

  const handleClick = () => {
    const newBugs = getInitialBugs(
      svgContainerDimensions,
      populationSize,
      bugSize
    );
    setBugs(newBugs);
    setPopulationSnapshots([]);
    setStepCount(0);
    resetCanvasDimens?.();
    setDeaths([]);
  };

  return (
    <div>
      <Button variant="default" onClick={handleClick}>
        reset
      </Button>
    </div>
  );
}

export default ResetButton;
