import _ from 'lodash';
import type { PopulationSnapshot } from '../../bugs/BugsProvider.tsx';
import type { Organism } from '../SnapshotDisplay';
import getColWidthHorizontal from './getColWidthHorizontal';
import getPathHorizontal from './getPathHorizontal';

type Props = {
  organismList: Organism[];
  screenDimensions: { width: number; height: number };
  populationSize: number;
  stretchFactor: number;
  thickness: number;
  populationSnapshots: PopulationSnapshot[];
};

// consumes a list of Organisms and formats the path and color for use in SVG element
export const formatOrganismPath = ({
  organismList,
  screenDimensions,
  populationSize,
  stretchFactor,
  thickness,
  populationSnapshots,
}: Props) => {
  const colWidth = getColWidthHorizontal(
    stretchFactor,
    populationSnapshots,
    screenDimensions
  );
  const rowHeight =
    (screenDimensions.height / populationSize) * parseFloat(String(thickness));

  return organismList.map((org) => {
    org.path = getPathHorizontal({
      pointList: org.pointList,
      colWidth,
      rowHeight,
    });
    return org;
  });
};

export const throttledFormatOrganismPath = _.throttle(formatOrganismPath, 2000);
