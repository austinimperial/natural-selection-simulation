import React, { useContext, useState, useEffect } from "react";
import { BugsContext } from "globalState/bugs/index";
import getBugPalette from "./getBugPalette";
import uuid from "react-uuid";
import { StyledContainer, StyledSwatch } from "./styles";

function DomPopulationColors({ maxColorCount }) {
  // local state
  const [palette, setPalette] = useState(
    Array(maxColorCount).fill([255, 255, 255])
  );

  // global state
  const { bugs, populationSize } = useContext(BugsContext);

  useEffect(() => {
    const livingBugs = bugs.slice(0, populationSize);
    const bugPalette = getBugPalette(livingBugs, maxColorCount);
    setPalette(bugPalette);
  }, [bugs, setPalette, populationSize, maxColorCount]);

  return (
    <StyledContainer>
      dominant colors in population:
      {palette.map((color) => (
        <StyledSwatch
          key={uuid()}
          color={color}
          veryLight={color[0] > 240 && color[1] > 240 && color[2] > 240}
        ></StyledSwatch>
      ))}
    </StyledContainer>
  );
}

export default DomPopulationColors;
