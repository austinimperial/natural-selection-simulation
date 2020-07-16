import React, { useContext } from "react";
import { SnapshotsCanvasContext } from "globalState/snapshotsCanvas/index";
import { BugsContext } from "globalState/bugs/index";
import { StyledScrollBox, StyledPath, StyledBackground } from './styles'
import uuid from 'react-uuid'

function LineSnapshots() {
  // global state
  const { screenDimensions, stretchFactor, isVertical, thickness, organismLinePaths, lineWidth } = useContext(
    SnapshotsCanvasContext
  );
  const { populationSnapshots } = useContext(BugsContext);

  if (populationSnapshots.length === 0) return <></>;

  return (
      <StyledScrollBox
        width={screenDimensions.width}
        height={screenDimensions.height}
        isVertical={isVertical}
      >
      <StyledBackground>
        <svg
            width={screenDimensions.width * (isVertical ? thickness : stretchFactor)}
            height={screenDimensions.height * (isVertical ? stretchFactor : thickness)}
        >
            {
                organismLinePaths.map(organism => (
                    <StyledPath
                        strokeWidth={lineWidth}
                        stroke={organism.color}
                        strokeLinecap="round"
                        fill="none"
                        d={organism.path}
                        key={uuid()}
                    ></StyledPath>
                ))
            }
        </svg>
      </StyledBackground>
      </StyledScrollBox>
  );
}

export default LineSnapshots;

