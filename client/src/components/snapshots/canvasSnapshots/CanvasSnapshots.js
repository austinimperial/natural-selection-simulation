import React, { useContext, useRef, useEffect } from "react";
import { SnapshotsDisplayContext } from "globalState/snapshotsDisplay/index";

function CanvasSnapshots({width,height}) {
  // global state
  const {
    setSnapshotsCanvasRef,
    isVertical,
  } = useContext(SnapshotsDisplayContext);

  // ref
  const canvasRef = useRef();

  useEffect(() => {
    setSnapshotsCanvasRef(canvasRef);
  }, []);

  return (
      <canvas
        style={{
          'flexShrink':'0'
        }}
        width={width}
        height={height}
        ref={canvasRef}
      ></canvas>    
  );
}

export default CanvasSnapshots;
