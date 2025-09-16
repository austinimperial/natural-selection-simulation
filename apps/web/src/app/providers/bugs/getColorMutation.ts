import type { BugData } from './BugsProvider';

export default function getColorMutation(
  parentBug: BugData,
  phenotypicDistance: number
): [number, number, number] {
  if (parentBug.clone) return parentBug.color;
  return parentBug.color.map((colorGene: number) => {
    const mutation = phenotypicDistance * (Math.random() > 0.5 ? -1 : 1);
    const newGene = colorGene + mutation;
    if (newGene < 0) return 0;
    if (newGene > 255) return 255;
    return newGene;
  }) as [number, number, number];
}
