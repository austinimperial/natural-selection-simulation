import { getMidpoints } from "./getMidpoints";

//outputs a string that can be assigned to the 'd' property of an SVG <path /> element
// lines travel left to right
function getPathHorizontal({ pointList, colWidth, rowHeight }) {
  const midpoints = getMidpoints(pointList);

  // if pointlist is of length 1, just draw lines straight across
  const firstXCoor = pointList[0].x
  const firstYCoor = pointList[0].y * rowHeight + rowHeight / 2
  if (pointList.length === 1 && firstXCoor === 0)
    return `M ${firstXCoor} ${firstYCoor} L ${colWidth} ${firstYCoor} `;

  const path = pointList.reduce((acc, current, i) => {
    const xCoor = current.x * colWidth;
    const yCoor = current.y * rowHeight + rowHeight / 2;
    const midpointX = midpoints[i].x * colWidth;
    const midpointY = midpoints[i].y * rowHeight + rowHeight / 2;

    // i === 0 means the point is the first in the organism pointlist, could start
    // anywhere along the display graphic
    if (i === 0) return `M ${xCoor} ${yCoor} L ${midpointX} ${midpointY} `;
    if (i === pointList.lenghth - 1) return (acc += `L ${xCoor} ${yCoor}`);
    return (acc += `Q ${xCoor} ${yCoor} ${midpointX} ${midpointY} `);
  }, "");
  return path;
}

export default getPathHorizontal;
