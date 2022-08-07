import React, { useContext } from "react";
import {
  StyledContainer,
  StyledP,
  StyledTitleContainer,
  StyledScrollBox,
  DeathsContainer
} from "./SnapshotsStyles";
import { SnapshotsDisplayContext } from "globalState/snapshotsDisplay/SnapshotDisplay";
import { BugsContext } from "globalState/bugs/BugsProvider";
import SnapshotsControls from "components/snapshots/snapshotsControls/SnapshotsControls";
import CanvasSnapshots from "./canvasSnapshots/CanvasSnapshots";
import SvgSnapshots from "./svgSnapshots/SvgSnapshots";
import DeathLeftArrow from "shared/icons/DeathLeftArrow";
import DeathDownArrow from "shared/icons/DeathDownArrow";

const DEATH_ICON_SIZE = 40
const ICON_SIZE_RATIO = 0.63492

function Snapshots() {
  // global state
  const { 
    isShowingSvg,
    screenDimensions,
    stretchFactor,
    isVertical,
    thickness,
  } = useContext(SnapshotsDisplayContext);
  const { populationSnapshots, deaths } = useContext(BugsContext);

  if (populationSnapshots.length === 0) return <></>;

  const width =
    screenDimensions.width * (isVertical ? thickness : stretchFactor);
  const height =
    screenDimensions.height * (isVertical ? stretchFactor : thickness);

  return (
    <StyledContainer>
      <StyledTitleContainer>
        <StyledP>Population Snapshots</StyledP>
      </StyledTitleContainer>
      <SnapshotsControls />
      <StyledScrollBox
        width={screenDimensions.width}
        height={screenDimensions.height}
        isVertical={isVertical}
      >
        <DeathsContainer
          isVertical={isVertical}
          containerSize={DEATH_ICON_SIZE / ICON_SIZE_RATIO}
          width={width}
          height={height}
        >
          {deaths.map((deathSnapshotIndex) => {
            const snapshotCount = populationSnapshots?.length || 0
            const snapshotWidth = Math.max(width,height) / snapshotCount
            const distance = (deathSnapshotIndex * (Math.max(width,height) / snapshotCount)) - (DEATH_ICON_SIZE/2) - (snapshotWidth/2)

            return isVertical ? (
              <DeathLeftArrow height={DEATH_ICON_SIZE} top={distance} />
            ) : (
              <DeathDownArrow width={DEATH_ICON_SIZE} left={distance} />
            )
          })}
        </DeathsContainer>
        {isShowingSvg ? (
          <SvgSnapshots width={width} height={height} />
        ) : (
          <CanvasSnapshots  width={width} height={height} />
        )}
      </StyledScrollBox>
    </StyledContainer>
  );
}

export default Snapshots;
