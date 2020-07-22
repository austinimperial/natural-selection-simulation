const getColWidthHorizontal = (
  stretchFactor,
  populationSnapshots,
  screenDimensions
) => {
  if (populationSnapshots.length === 0 || populationSnapshots.length === 1)
    return screenDimensions.width * parseFloat(stretchFactor);
  return (
    (screenDimensions.width * parseFloat(stretchFactor)) /
    (populationSnapshots.length - 1)
  );
};

export default getColWidthHorizontal;
