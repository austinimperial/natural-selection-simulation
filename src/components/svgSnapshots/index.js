import React, { useContext } from "react";
import { SnapshotsDisplayContext } from "globalState/snapshotsDisplay/index";
import { BugsContext } from "globalState/bugs/index";
import { StyledScrollBox, StyledPath, StyledBackground } from "./styles";
import uuid from "react-uuid";

function SvgSnapshots() {
  // global state
  const {
    screenDimensions,
    stretchFactor,
    isVertical,
    thickness,
    organisms,
    lineWidth,
  } = useContext(SnapshotsDisplayContext);
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
          width={
            screenDimensions.width * (isVertical ? thickness : stretchFactor)
          }
          height={
            screenDimensions.height * (isVertical ? stretchFactor : thickness)
          }
        >
          {organisms.map((organism) => (
            <StyledPath
              strokeWidth={lineWidth}
              stroke={organism.formattedColor}
              strokeLinecap="round"
              fill="none"
              d={organism.path}
              key={uuid()}
            ></StyledPath>
          ))}
        </svg>
      </StyledBackground>
    </StyledScrollBox>
  );
}

export default SvgSnapshots;
