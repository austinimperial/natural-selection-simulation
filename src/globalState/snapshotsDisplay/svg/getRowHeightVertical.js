const getRowHeightVertical = (
  stretchFactor,
  populationSnapshots,
  screenDimensions
) => {
  if (populationSnapshots.length === 0 || populationSnapshots.length === 1)
    return screenDimensions.height * parseInt(stretchFactor);
  return (
    (screenDimensions.height * parseInt(stretchFactor)) /
    (populationSnapshots.length - 1)
  );
};

export default getRowHeightVertical;