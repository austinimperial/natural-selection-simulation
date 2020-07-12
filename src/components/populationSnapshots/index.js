import React, { useContext, useRef, useEffect } from "react";
import { SnapshotsCanvasContext } from "globalState/snapshotsCanvas/index";
import { BugsContext } from "globalState/bugs/index";

function PopulationSnapshots() {
  // global state
  const { setSnapshotsCanvasRef, canvasDimensions } = useContext(
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
    <canvas
      width={canvasDimensions.width}
      height={canvasDimensions.height}
      ref={canvasRef}
    ></canvas>
  );
}

export default PopulationSnapshots;
