'use client';

import Button from '@repo/ui/Button';
import { useContext } from 'react';
import { BugsContext } from '../../global-state/bugs/BugsProvider';
import { SnapshotsDisplayContext } from '../../global-state/snapshotsDisplay/SnapshotDisplay';
import { SvgDimensionsContext } from '../../global-state/svgContainerDimensions/index';

function ResetButton() {
  const {
    populationSize,
    bugSize,
    setPopulationSnapshots,
    setBugs,
    getInitialBugs,
    setStepCount,
    setDeaths,
  } = useContext(BugsContext);
  const { svgContainerDimensions } = useContext(SvgDimensionsContext);
  const { resetCanvasDimens } = useContext(SnapshotsDisplayContext);

  const handleClick = () => {
    const newBugs = getInitialBugs(
      svgContainerDimensions,
      populationSize,
      bugSize
    );
    setBugs(newBugs);
    setPopulationSnapshots([]);
    setStepCount(0);
    resetCanvasDimens();
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
