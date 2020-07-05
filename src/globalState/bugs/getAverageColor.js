export default function getAverageColor(allBugs, populationSize) {
  if (allBugs.length === 0) return undefined;
  const livingBugs = allBugs.slice(0, populationSize);
  const sumColor = livingBugs.reduce(
    (acc, bug) => {
      return acc.map((colorValue, i) => (colorValue += bug.color[i]));
    },
    [0, 0, 0]
  );
  return sumColor.map((value) => Math.floor(value / populationSize));
}
