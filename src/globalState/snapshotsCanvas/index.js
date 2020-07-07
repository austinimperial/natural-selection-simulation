import React, { useState, useEffect } from "react";
import getDocumentDimensions from './getDocumentDimensions'
import updateCanvas from './updateCanvas'
export const SnapshotsCanvasContext = React.createContext();
const _ = require('lodash')

function SnapshotsCanvasProvider({ children }) {
  // local state
  const [snapshotsCanvasRef,setSnapshotsCanvasRef] = useState(null);
  const [canvasDimensions,setCanvasDimensions] = useState(getDocumentDimensions())

  useEffect(() => {
    const resizeCanvas = () => {
        setCanvasDimensions(getDocumentDimensions())
    }
    window.addEventListener("resize", _.throttle(resizeCanvas, 500));
    return () =>
      window.removeEventListener("resize", _.throttle(resizeCanvas, 500));
  }, []);

  const value = {
    snapshotsCanvasRef,
    setSnapshotsCanvasRef,
    canvasDimensions,setCanvasDimensions,
    updateCanvas
};

  return (
    <SnapshotsCanvasContext.Provider value={value}>
      {children}
    </SnapshotsCanvasContext.Provider>
  );
}

export default SnapshotsCanvasProvider;