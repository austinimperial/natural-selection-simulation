interface Point {
  x: number;
  y: number;
}

export function getMidpoint(
  p1x: number,
  p1y: number,
  p2x: number,
  p2y: number
): Point {
  return {
    x: (p1x + p2x) / 2,
    y: (p1y + p2y) / 2,
  };
}

export function getMidpoints(pointList: Point[]): Point[] {
  return pointList.map((point: Point, i: number) => {
    if (i === pointList.length - 1) return point;
    const nextPoint = pointList[i + 1];
    return getMidpoint(point.x, point.y, nextPoint.x, nextPoint.y);
  });
}
