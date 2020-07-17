import { getMidpoints } from "./getMidpoints";

//outputs a string that can be assigned to the 'd' property of an SVG <path /> element
// lines travel top to bottom
function getPathVertical({
  pointList,
  screenDimensions,
  populationSize,
  thickness,
  stretchFactor,
  populationSnapshots,
}) {
  const colWidth =
    (screenDimensions.width / populationSize) * parseFloat(thickness);
  const rowHeight =
    (screenDimensions.height * parseInt(stretchFactor)) /
    (populationSnapshots.length - 1);
  const midpoints = getMidpoints(pointList);

  const path = pointList.reduce((acc, current, i) => {
    const yCoor = current.x * rowHeight;
    const xCoor = current.y * colWidth + colWidth / 2;
    const midpointX = midpoints[i].y * colWidth + colWidth / 2;
    const midpointY = midpoints[i].x * rowHeight;

    if (i === 0) return `M ${xCoor} ${yCoor} L ${midpointX} ${midpointY} `;
    return (acc += `Q ${xCoor} ${yCoor} ${midpointX} ${midpointY} `);
  }, "");
  return path;
}

export default getPathVertical;
