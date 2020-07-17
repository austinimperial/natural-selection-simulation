import React, { useContext, useRef, useEffect } from "react";
import { SnapshotsDisplayContext } from "globalState/snapshotsDisplay/index";
import { BugsContext } from "globalState/bugs/index";
import { StyledScrollBox } from "./styles";

function CanvasSnapshots() {
  // global state
  const {
    setSnapshotsCanvasRef,
    screenDimensions,
    stretchFactor,
    isVertical,
    thickness,
  } = useContext(SnapshotsDisplayContext);
  const { populationSnapshots } = useContext(BugsContext);

  // ref
  const canvasRef = useRef();

  useEffect(() => {
    setSnapshotsCanvasRef(canvasRef);
  }, []);

  if (populationSnapshots.length === 0) return <></>;

  return (
    <StyledScrollBox
      width={screenDimensions.width}
      height={screenDimensions.height}
      isVertical={isVertical}
    >
      <canvas
        width={
          screenDimensions.width * (isVertical ? thickness : stretchFactor)
        }
        height={
          screenDimensions.height * (isVertical ? stretchFactor : thickness)
        }
        ref={canvasRef}
      ></canvas>
    </StyledScrollBox>
  );
}

export default CanvasSnapshots;
