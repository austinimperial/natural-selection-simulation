const getRowHeightVertical = (
  stretchFactor,
  populationSnapshots,
  screenDimensions
) => {
  if (populationSnapshots.length === 0 || populationSnapshots.length === 1)
    return screenDimensions.height * parseFloat(stretchFactor);
  return (
    (screenDimensions.height * parseFloat(stretchFactor)) /
    (populationSnapshots.length - 1)
  );
};

export default getRowHeightVertical;
