import React, { useState, useEffect, useContext } from "react";
import getDocumentDimensions from "./getDocumentDimensions";
import { drawSnapshotsHorizontal, drawSnapshotsVertical } from "./drawSnapshots";
import { BugsContext } from 'globalState/bugs/index'
export const SnapshotsCanvasContext = React.createContext();
const _ = require("lodash");

function SnapshotsCanvasProvider({ children }) {
  // local state
  const [isVertical,setIsVertical] = useState(false)
  const [snapshotsCanvasRef, setSnapshotsCanvasRef] = useState(null);
  const [canvasDimensions, setCanvasDimensions] = useState(
    getDocumentDimensions()
  );

  // global state
  const { populationSize, populationSnapshots } = useContext(BugsContext)

  const handleResize = _.throttle(() => {
    const {width,height} = getDocumentDimensions()
    if (width < height) return setIsVertical(true)
    setIsVertical(false)
  },200)

  useEffect(() => {
    handleResize()
    window.addEventListener("resize", handleResize);
    return () => 
      window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const documentDimensions = getDocumentDimensions()
    if (isVertical) return setCanvasDimensions({
      height: documentDimensions.height,
      width: documentDimensions.width
    })
    setCanvasDimensions(documentDimensions)
  },[isVertical])

  useEffect(() => {
    if (snapshotsCanvasRef === null) return;

    if (!isVertical) return drawSnapshotsHorizontal(
      populationSnapshots,
      canvasDimensions,
      populationSize,
      snapshotsCanvasRef.current
    );

    drawSnapshotsVertical(
      populationSnapshots,
      canvasDimensions,
      populationSize,
      snapshotsCanvasRef.current
    );

  }, [
    populationSnapshots,
    canvasDimensions,
    snapshotsCanvasRef,
    populationSize,
    isVertical
  ]);

  const value = {
    snapshotsCanvasRef,
    setSnapshotsCanvasRef,
    canvasDimensions,
    setCanvasDimensions,
    isVertical,
    setIsVertical
  };

  return (
    <SnapshotsCanvasContext.Provider value={value}>
      {children}
    </SnapshotsCanvasContext.Provider>
  );
}

export default SnapshotsCanvasProvider;
