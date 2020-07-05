import React, { useContext, useState, useEffect } from "react";
import { StyledSvg } from "./styles";
import { bugPath } from "./bugPath";
import { BugsContext } from "globalState/bugs/index";
import { CanvasDimensionsContext } from "globalState/canvasDimensions/index";
import getAverageColor from "globalState/bugs/getAverageColor";

function Bug({ bug, i }) {
  // local state
  const [isGrowing, setIsGrowing] = useState(true);

  // global state
  const {
    bugSize,
    eatBugAndSpawnNew,
    setBugs,
    maxOffspringDistance,
    bugs,
    populationSize,
    growSpeed,
    maxMutationStep,
    setAvgColors,
  } = useContext(BugsContext);
  const { canvasDimensions, canvasOffset } = useContext(
    CanvasDimensionsContext
  );

  // set isGrowing to false once bug is done growing
  // this is done so that the growing animation is only triggered when the bug first mounts
  useEffect(() => {
    setTimeout(() => setIsGrowing(false), growSpeed * 1000);
  }, []);

  const hanldleMouseEnter = () => {
    const newBugs = eatBugAndSpawnNew(
      i,
      canvasDimensions,
      maxOffspringDistance,
      bugs,
      bugSize,
      populationSize,
      maxMutationStep
    );
    setBugs(newBugs);

    const newAvgColor = getAverageColor(newBugs, populationSize);
    setAvgColors((prevAvgColors) => [...prevAvgColors, newAvgColor]);
  };

  return (
    <div
      style={{
        position: "absolute",
        left: `${bug.x + canvasOffset.left}px`,
        top: `${bug.y + canvasOffset.top}px`,
      }}
    >
      <StyledSvg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 255.036 255.036"
        xml="preserve"
        height={bugSize}
        fill={`rgb(${bug.color[0]},${bug.color[1]},${bug.color[2]})`}
        onMouseEnter={hanldleMouseEnter}
        // growSpeed defaults to zero unless the bug isGrowing immediately after mount
        growSpeed={isGrowing ? growSpeed : 0}
        transform={`rotate(${bug.orientation})`}
        transform-origin={"center"}
      >
        <path d={bugPath} />
      </StyledSvg>
    </div>
  );
}

export default Bug;
