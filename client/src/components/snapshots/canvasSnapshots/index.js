import React, { useContext, useRef, useEffect } from "react";
import { SnapshotsDisplayContext } from "globalState/snapshotsDisplay/index";
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

  // ref
  const canvasRef = useRef();

  useEffect(() => {
    setSnapshotsCanvasRef(canvasRef);
  }, []);

  return (
    <StyledScrollBox
      width={screenDimensions.width}
      height={screenDimensions.height}
      isVertical={isVertical}
    >
      <canvas
        style={{
          'flexShrink':'0'
        }}
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
