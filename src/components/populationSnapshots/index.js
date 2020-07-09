import React, { useContext, useRef, useEffect } from "react";
import { BugsContext } from "globalState/bugs/index";
import { SnapshotsCanvasContext } from "globalState/snapshotsCanvas/index";

function PopulationSnapshots() {
  // global state
  const { populationSnapshots, populationSize } = useContext(BugsContext);
  const {
    setSnapshotsCanvasRef,
    canvasDimensions,
    updateCanvas,
    snapshotsCanvasRef,
  } = useContext(SnapshotsCanvasContext);

  // ref
  const canvasRef = useRef();

  useEffect(() => {
    setSnapshotsCanvasRef(canvasRef);
  }, []);

  useEffect(() => {
    if (snapshotsCanvasRef === null) return;
    updateCanvas(
      populationSnapshots,
      canvasDimensions,
      populationSize,
      snapshotsCanvasRef.current
    );
  }, [
    populationSnapshots,
    updateCanvas,
    canvasDimensions,
    snapshotsCanvasRef,
    populationSize,
  ]);

  return (
    <canvas
      width={canvasDimensions.width}
      height={canvasDimensions.height}
      style={{
        border: "1px solid black",
      }}
      ref={canvasRef}
    ></canvas>
  );
}

export default PopulationSnapshots;
