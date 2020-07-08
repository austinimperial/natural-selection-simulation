export default function getAverageColor(livingBugs, populationSize) {
  if (livingBugs.length === 0) return undefined;
  const sumColor = livingBugs.reduce(
    (acc, bug) => {
      return acc.map((colorValue, i) => (colorValue += bug.color[i]));
    },
    [0, 0, 0]
  );
  return sumColor.map((value) => Math.floor(value / populationSize));
}