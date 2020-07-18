import getPathHorizontal from "./getPathHorizontal";
import getPathVertical from "./getPathVertical";
import getColWidthHorizontal from "./getColWidthHorizontal";
import getRowHeightVertical from './getRowHeightVertical'
const _ = require("lodash");

// consumes a list of Organisms and formats the path and color for use in SVG element
export const formatOrganismPath = ({
  organismList,
  screenDimensions,
  populationSize,
  stretchFactor,
  thickness,
  isVertical,
  populationSnapshots,
}) => {
  if (isVertical) {
    const colWidth = 
      (screenDimensions.width / populationSize) * parseFloat(thickness);

    const rowHeight = getRowHeightVertical(
      stretchFactor,
      populationSnapshots,
      screenDimensions
    );

    return organismList.map((org) => {
      org.path = getPathVertical({
        pointList: org.pointList,
        colWidth,
        rowHeight,
      });
      return org;
    });
  }

  const colWidth = getColWidthHorizontal(
    stretchFactor,
    populationSnapshots,
    screenDimensions
  );
  const rowHeight =
    (screenDimensions.height / populationSize) * parseFloat(thickness);

  return organismList.map((org) => {
    org.path = getPathHorizontal({
      pointList: org.pointList,
      colWidth,
      rowHeight,
    });
    return org;
  });
};

export const throttledFormatOrganismPath = _.throttle(formatOrganismPath, 2000);
