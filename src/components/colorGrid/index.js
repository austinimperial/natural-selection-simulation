import React, { useContext, useEffect } from "react";
import { BugsContext } from "globalState/bugs/index";
import { StyledContainer } from "./styles";
import getGradientString from "./getGradientString";

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
      // these styles are added inline to prevent styled-components from
      // generating a new class every time this component renders.
      // Otherwise you get a "over 200 classes were generated..." warning.
      style={{
        background: `linear-gradient(180deg, ${getGradientString(
          avgColors.slice(1)
        )} )`,
        backgroundColor: `${getGradientString(avgColors.slice(1))}`,
      }}
    ></StyledContainer>
  );
}

export default ColorGrid;
