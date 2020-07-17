export function getMidpoint(p1x, p1y, p2x, p2y) {
  return {
    x: (p1x + p2x) / 2,
    y: (p1y + p2y) / 2,
  };
}

export function getMidpoints(pointList) {
  return pointList.map((point, i) => {
    if (i === pointList.length - 1) return point;
    const nextPoint = pointList[i + 1];
    return getMidpoint(point.x, point.y, nextPoint.x, nextPoint.y);
  });
}
