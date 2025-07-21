import type { Point } from '../SnapshotDisplay';
import { getMidpoints } from './getMidpoints';

//outputs a string that can be assigned to the 'd' property of an SVG <path /> element
// lines travel top to bottom
function getPathVertical({
  pointList,
  colWidth,
  rowHeight,
}: {
  pointList: Point[];
  colWidth: number;
  rowHeight: number;
}) {
  const midpoints = getMidpoints(pointList);

  // if pointlist is of length 1, just draw lines straight down
  const x = pointList[0].y * colWidth;
  if (pointList.length === 1 && pointList[0].x === 0)
    return `M ${x} 0 L ${x} ${rowHeight} `;

  const path = pointList.reduce((acc, current, i) => {
    const yCoor = current.x * rowHeight;
    const xCoor = current.y * colWidth + colWidth / 2;
    const midpointX = midpoints[i].y * colWidth + colWidth / 2;
    const midpointY = midpoints[i].x * rowHeight;

    if (i === 0) return `M ${xCoor} ${yCoor} L ${midpointX} ${midpointY} `;
    if (i === pointList.length - 1) {
      acc += `L ${xCoor} ${yCoor}`;
      return acc;
    }
    acc += `Q ${xCoor} ${yCoor} ${midpointX} ${midpointY} `;
    return acc;
  }, '');
  return path;
}

export default getPathVertical;
