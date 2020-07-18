const getColWidthHorizontal = (
  stretchFactor,
  populationSnapshots,
  screenDimensions
) => {
  if (populationSnapshots.length === 0 || populationSnapshots.length === 1)
    return screenDimensions.width * parseInt(stretchFactor);
  return (
    (screenDimensions.width * parseInt(stretchFactor)) /
    (populationSnapshots.length - 1)
  );
};

export default getColWidthHorizontal;
