import type { PopulationSnapshot } from '@/app/global-state/bugs/BugsProvider.tsx';

const getRowHeightVertical = (
  stretchFactor: number,
  populationSnapshots: PopulationSnapshot[],
  screenDimensions: { width: number; height: number }
) => {
  if (populationSnapshots.length === 0 || populationSnapshots.length === 1)
    return screenDimensions.height * parseFloat(String(stretchFactor));
  return (
    (screenDimensions.height * parseFloat(String(stretchFactor))) /
    (populationSnapshots.length - 1)
  );
};

export default getRowHeightVertical;
