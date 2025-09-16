import type { PopulationSnapshot } from '@/app/providers/bugs/BugsProvider';
import type { Organism } from '../SnapshotsProvider.tsx';

function updatePointlist(
  id: string,
  array: Organism[],
  pathItem: { x: number; y: number }
) {
  array.forEach((org) => {
    if (org.id === id) {
      org.pointList.push(pathItem);
    }
  });
}

// getOrganismList creates a list of all individual bugs to have ever lived in the simulation
function getOrganismList(populationSnapshots: PopulationSnapshot[]) {
  const idList = [] as string[];
  const organismList = [] as Organism[];
  populationSnapshots.forEach((ps, x) => {
    ps.forEach((bug, y) => {
      if (!idList.includes(bug.id)) {
        idList.push(bug.id);

        const newOrg: Organism = {
          id: bug.id,
          pointList: [{ x, y }],
          color: bug.color,
          path: '',
          formattedColor: `rgb(${bug.color[0]},${bug.color[1]},${bug.color[2]})`,
        };

        organismList.push(newOrg);
      }

      updatePointlist(bug.id, organismList, { x, y });
    });
  });
  return organismList;
}

export default getOrganismList;
