export default function getColorMutation(parentBug, maxMutationStep) {
  if (parentBug.clone) return parentBug.color
  return parentBug.color.map((colorGene) => {
    const randStep = () => Math.floor(Math.random() * maxMutationStep) + 1;
    const mutation = randStep() - randStep();
    const newGene = colorGene + mutation;
    if (newGene < 0) return 0;
    if (newGene > 255) return 255;
    return colorGene + mutation;
  });
}
