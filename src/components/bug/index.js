import React, { useContext } from "react";
import { StyledContainer, StyledSvg } from "./styles";
import { bugPath } from "./bugPath";
import { BugsContext } from "globalState/bugs/index";
import { CanvasDimensionsContext } from "globalState/canvasDimensions/index";

function Bug({ bug, i }) {
  // global state
  const {
    bugSize,
    eatBug,
    setBugs,
    spawnNewOffspring,
    maxOffspringDistance,
    bugs,
    populationSize,
  } = useContext(BugsContext);
  const { canvasDimensions, canvasOffset } = useContext(
    CanvasDimensionsContext
  );

  const hanldleMouseEnter = () => {
    eatBug(i, setBugs);
    spawnNewOffspring(
      setBugs,
      canvasDimensions,
      maxOffspringDistance,
      bug,
      bugs,
      bugSize,
      i,
      populationSize
    );
  };

  return (
    <StyledContainer
      xCoor={bug.x + canvasOffset.left}
      yCoor={bug.y + canvasOffset.top}
    >
      <StyledSvg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 255.036 255.036"
        xml="preserve"
        height={bugSize}
        fill={`rgb(${bug.color[0]},${bug.color[1]},${bug.color[2]})`}
        onMouseEnter={hanldleMouseEnter}
      >
        <path d={bugPath} />
      </StyledSvg>
    </StyledContainer>
  );
}

export default Bug;
