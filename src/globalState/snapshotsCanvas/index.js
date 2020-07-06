import React, { useState, useEffect } from "react";
import getDocumentDimensions from './getDocumentDimensions'
export const SnapshotsCanvasContext = React.createContext();
const _ = require('lodash')

function SnapshotsCanvasProvider({ children }) {
  // local state
  const [snapshotsCanvasRef,setSnapshotsCanvasRef] = useState(null);
  const [canvasDimensions,setCanvasDimensions] = useState(getDocumentDimensions())

  const value = {
      snapshotsCanvasRef,
      setSnapshotsCanvasRef,
      canvasDimensions,setCanvasDimensions
  };

  useEffect(() => {
    const resizeCanvas = () => {
        setCanvasDimensions(getDocumentDimensions())
    }
    window.addEventListener("resize", _.throttle(resizeCanvas, 200));
    return () =>
      window.removeEventListener("resize", _.throttle(resizeCanvas, 200));
  }, []);

  return (
    <SnapshotsCanvasContext.Provider value={value}>
      {children}
    </SnapshotsCanvasContext.Provider>
  );
}

export default SnapshotsCanvasProvider;