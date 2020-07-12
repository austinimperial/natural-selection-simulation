import React, { useContext, useRef, useEffect } from "react";
import { SnapshotsCanvasContext } from "globalState/snapshotsCanvas/index";
import { BugsContext } from "globalState/bugs/index";
import { StyledScrollBox } from './styles'

function PopulationSnapshots() {
  // global state
  const { setSnapshotsCanvasRef, screenDimensions, stretchFactor, isVertical } = useContext(
    SnapshotsCanvasContext
  );
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
    >
    <canvas
      width={screenDimensions.width * (isVertical ? 1 : stretchFactor)}
      height={screenDimensions.height * (isVertical ? stretchFactor : 1)}
      ref={canvasRef}
    ></canvas>
    </StyledScrollBox>
  );
}

export default PopulationSnapshots;
