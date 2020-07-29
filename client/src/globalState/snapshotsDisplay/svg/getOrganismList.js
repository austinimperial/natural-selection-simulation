import Organism from "./organism";

function updatePointlist(id, array, pathItem) {
  array.forEach((org) => {
    if (org.id === id) {
      org.pointList.push(pathItem);
    }
  });
}

// getOrganismList creates a list of all individual bugs to have ever lived in the simulation
function getOrganismList(populationSnapshots) {
  const idList = [];
  const organismList = [];
  populationSnapshots.forEach((ps, x) => {
    ps.forEach((bug, y) => {
      if (!idList.includes(bug.id)) {
        idList.push(bug.id);

        const newOrg = new Organism();
        newOrg.id = bug.id;
        newOrg.pointList = [{ x, y }];
        newOrg.color = bug.color;
        newOrg.formattedColor = `rgb(${bug.color[0]},${bug.color[1]},${bug.color[2]})`;
        return organismList.push(newOrg);
      }

      return updatePointlist(bug.id, organismList, { x, y });
    });
  });
  return organismList;
}

export default getOrganismList;
