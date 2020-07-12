import React, { useState, useEffect, useContext, useCallback } from "react";
import getDocumentDimensions from "./getDocumentDimensions";
import drawCanvas from "./drawCanvas";
import { BugsContext } from "globalState/bugs/index";
export const SnapshotsCanvasContext = React.createContext();
const _ = require("lodash");

function SnapshotsCanvasProvider({ children }) {
  // local state
  const [isVertical, setIsVertical] = useState(false);
  const [snapshotsCanvasRef, setSnapshotsCanvasRef] = useState(null);
  const [canvasDimensions, setCanvasDimensions] = useState(
    getDocumentDimensions()
  );

  // global state
  const { populationSize, populationSnapshots } = useContext(BugsContext);

  // The drawing is split between two useEffect fuctions so that I can conditionally
  // change the parameters of drawCanvas depending on which dependency/ies changed.
  // Between the two useEffects, all dependencies are covered. This is an unusual
  // case to be sure. The logic boils down to this: If the screen is resizing
  // (i.e. canvasDimensions is changing) then do NOT throttle drawCanvas.
  // Under the normal conditions of usage, however, I do need to throttle drawCanvas.
  // At first, I tried creating an 'isResizing' local state to condionally call drawCanvas 
  // off of, thereby allowing me to group all drawCanvas calls into one usEffect.
  // But the result, although a bit more readable here, was choppier for the user.
  useEffect(() => {
    drawCanvas({
      snapshotsCanvasRef,
      populationSize,
      populationSnapshots,
      canvasDimensions,
      isVertical,
      throttle:false,
    });
  }, [populationSnapshots, snapshotsCanvasRef, populationSize, isVertical]);

  useEffect(() => {
    drawCanvas({
      snapshotsCanvasRef,
      populationSize,
      populationSnapshots,
      canvasDimensions,
      isVertical,
      throttle:true,
    });
  }, [canvasDimensions]);

  const handleResize = _.throttle(() => {
    const { width, height } = getDocumentDimensions();
    if (width < height) return setIsVertical(true);
    setIsVertical(false);
    setCanvasDimensions({ width, height });
  }, 200);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const resetCanvasDimens = () => {
    const docDimens = getDocumentDimensions();
    setCanvasDimensions(docDimens);
  };

  const makeThin = () => {
    const { width, height } = getDocumentDimensions();
    setCanvasDimensions({
      width,
      height: height / 3,
    });
  };

  const value = {
    snapshotsCanvasRef,
    setSnapshotsCanvasRef,
    canvasDimensions,
    setCanvasDimensions,
    isVertical,
    setIsVertical,
    resetCanvasDimens,
    makeThin,
  };

  return (
    <SnapshotsCanvasContext.Provider value={value}>
      {children}
    </SnapshotsCanvasContext.Provider>
  );
}

export default SnapshotsCanvasProvider;
