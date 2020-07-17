import getPathHorizontal from "./getPathHorizontal";
import getPathVertical from "./getPathVertical";
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
  if (isVertical)
    return organismList.map((org) => {
      org.path = getPathVertical({
        pointList: org.pointList,
        screenDimensions,
        populationSize,
        stretchFactor,
        thickness,
        populationSnapshots,
      });
      return org;
    });

  return organismList.map((org) => {
    org.path = getPathHorizontal({
      pointList: org.pointList,
      screenDimensions,
      populationSize,
      stretchFactor,
      thickness,
      populationSnapshots,
    });
    return org;
  });
};

export const throttledFormatOrganismPath = _.throttle(formatOrganismPath, 3000);
export const slightlyThrottledFormatOrganismPath = _.throttle(
  formatOrganismPath,
  200
);
