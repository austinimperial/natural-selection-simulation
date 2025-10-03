import type { PopulationSnapshot } from '../../bugs/BugsProvider.tsx';
import {
  formatOrganismPath,
  throttledFormatOrganismPath,
} from './formatOrganismPath.ts';
import getOrganismList from './getOrganismList.ts';

type Props = {
  populationSnapshots: PopulationSnapshot[];
  populationSize: number;
  stretchFactor: number;
  thickness: number;
  lineWidth: number;
  screenDimensions: { width: number; height: number };
  throttle: boolean;
};

const getOrganisms = ({
  populationSnapshots,
  populationSize,
  stretchFactor,
  thickness,
  lineWidth,
  screenDimensions,
  throttle,
}: Props) => {
  const orgList = getOrganismList(populationSnapshots);

  if (!throttle) {
    return formatOrganismPath({
      organismList: orgList,
      populationSnapshots,
      stretchFactor,
      thickness,
      lineWidth,
      populationSize,
      screenDimensions,
    });
  }

  return throttledFormatOrganismPath({
    organismList: orgList,
    populationSnapshots,
    stretchFactor,
    thickness,
    lineWidth,
    populationSize,
    screenDimensions,
  });
};

export default getOrganisms;
