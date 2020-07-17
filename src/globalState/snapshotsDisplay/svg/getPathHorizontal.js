import { getMidpoints } from "./getMidpoints";

//outputs a string that can be assigned to the 'd' property of an SVG <path /> element
// lines travel left to right
function getPathHorizontal({
  pointList,
  screenDimensions,
  populationSize,
  thickness,
  stretchFactor,
  populationSnapshots,
}) {
  const colWidth =
    (screenDimensions.width * parseInt(stretchFactor)) /
    (populationSnapshots.length - 1);
  const rowHeight =
    (screenDimensions.height / populationSize) * parseFloat(thickness);
  const midpoints = getMidpoints(pointList);

  const path = pointList.reduce((acc, current, i) => {
    const xCoor = current.x * colWidth;
    const yCoor = current.y * rowHeight + rowHeight / 2;
    const midpointY = midpoints[i].y * rowHeight + rowHeight / 2;
    const midpointX = midpoints[i].x * colWidth;

    if (i === 0) return `M ${xCoor} ${yCoor} L ${midpointX} ${midpointY} `;
    return (acc += `Q ${xCoor} ${yCoor} ${midpointX} ${midpointY} `);
  }, "");
  return path;
}

export default getPathHorizontal;
