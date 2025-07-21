import _ from 'lodash';
import type { PopulationSnapshot } from '../../bugs/BugsProvider.tsx';
import type { Organism } from '../SnapshotDisplay';
import getColWidthHorizontal from './getColWidthHorizontal';
import getPathHorizontal from './getPathHorizontal';
import getPathVertical from './getPathVertical';
import getRowHeightVertical from './getRowHeightVertical';

type Props = {
  organismList: Organism[];
  screenDimensions: { width: number; height: number };
  populationSize: number;
  stretchFactor: number;
  thickness: number;
  isVertical: boolean;
  populationSnapshots: PopulationSnapshot[];
};
// consumes a list of Organisms and formats the path and color for use in SVG element
export const formatOrganismPath = ({
  organismList,
  screenDimensions,
  populationSize,
  stretchFactor,
  thickness,
  isVertical,
  populationSnapshots,
}: Props) => {
  if (isVertical) {
    const colWidth =
      (screenDimensions.width / populationSize) * parseFloat(String(thickness));

    const rowHeight = getRowHeightVertical(
      stretchFactor,
      populationSnapshots,
      screenDimensions
    );

    return organismList.map((org) => {
      org.path = getPathVertical({
        pointList: org.pointList,
        colWidth,
        rowHeight,
      });
      return org;
    });
  }

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
