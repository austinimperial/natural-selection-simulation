import quantize from 'quantize';
import type { BugData } from '../global-state/bugs/BugsProvider';

export default function getBugPalette(bugs: BugData[], maxColorCount: number) {
  if (bugs.length === 0) return Array(maxColorCount).fill([255, 255, 255]);
  const rgbArray = bugs.map((bug) => [
    bug.color[0],
    bug.color[1],
    bug.color[2],
  ]);
  const colorMap = quantize(rgbArray, maxColorCount);
  return colorMap.palette();
}
