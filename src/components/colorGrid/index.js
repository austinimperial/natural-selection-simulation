import React, { useContext, useEffect } from "react";
import { BugsContext } from "globalState/bugs/index";
import { StyledContainer } from "./styles";
import getGradientString from './getGradientString'

function ColorGrid() {
  // global state
  const {
    bugs,
    populationSize,
    avgColors,
    setAvgColors,
    getAverageColor,
  } = useContext(BugsContext);

  useEffect(() => {
    setAvgColors((prevAvgColors) => {
      const newAvgColor = getAverageColor(bugs, populationSize);
      return [...prevAvgColors, newAvgColor];
    });
  }, [bugs, populationSize, setAvgColors, getAverageColor]);

  return (
    <StyledContainer
        isInitial={avgColors.slice(1).length === 1}
        gradientString={() => getGradientString(avgColors.slice(1))}
    >
    </StyledContainer>
  );
}

export default ColorGrid;
