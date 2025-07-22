import type { PopulationSnapshot } from '../../bugs/BugsProvider.tsx';
import {
  formatOrganismPath,
  throttledFormatOrganismPath,
} from './formatOrganismPath';
import getOrganismList from './getOrganismList';

type Props = {
  populationSnapshots: PopulationSnapshot[];
  populationSize: number;
  stretchFactor: number;
  thickness: number;
  screenDimensions: { width: number; height: number };
  throttle: boolean;
};

const getOrganisms = ({
  populationSnapshots,
  populationSize,
  stretchFactor,
  thickness,
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
      populationSize,
      screenDimensions,
    });
  }

  return throttledFormatOrganismPath({
    organismList: orgList,
    populationSnapshots,
    stretchFactor,
    thickness,
    populationSize,
    screenDimensions,
  });
};

export default getOrganisms;
