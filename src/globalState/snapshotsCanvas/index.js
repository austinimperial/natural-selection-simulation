import React, { useState, useEffect, useContext } from "react";
import getDocumentDimensions from "./getDocumentDimensions";
import drawCanvas from "./drawCanvas";
import { BugsContext } from "globalState/bugs/index";
export const SnapshotsCanvasContext = React.createContext();
const _ = require("lodash");

function SnapshotsCanvasProvider({ children }) {
  // local state
  const [isVertical, setIsVertical] = useState(false);
  const [stretchFactor,setStretchFactor] = useState(1)
  const [snapshotsCanvasRef, setSnapshotsCanvasRef] = useState(null);
  const [screenDimensions, setScreenDimensions] = useState(
    getDocumentDimensions()
  );

  // global state
  const { populationSize, populationSnapshots } = useContext(BugsContext);

  // The drawing is split between two useEffect fuctions so that I can conditionally
  // change the parameters of drawCanvas depending on which dependency/ies changed.
  // Between the two useEffects, all dependencies are covered. This is an unusual
  // case to be sure. The logic boils down to this: If populationSnapshots is changing,
  // throttle drawCanvas. Don't otherwise. At first, I tried creating an 'isResizing' 
  // local state to use to condionally call drawCanvas, thereby allowing me to group 
  // all drawCanvas calls into one usEffect. But the result, although a bit more 
  // readable here, was choppier for the user.
  useEffect(() => {
    drawCanvas({
      snapshotsCanvasRef,
      populationSize,
      populationSnapshots,
      screenDimensions,
      isVertical,
      stretchFactor,
      throttle:true,
    });
  }, [populationSnapshots]);

  useEffect(() => {
    drawCanvas({
      snapshotsCanvasRef,
      populationSize,
      populationSnapshots,
      screenDimensions,
      isVertical,
      stretchFactor,
      throttle:false,
    });
  }, [screenDimensions,stretchFactor,isVertical,snapshotsCanvasRef,populationSize]);

  const handleResize = _.throttle(() => {
    const { width, height } = getDocumentDimensions();
    setScreenDimensions({ width, height });
    setIsVertical(false);
    if (width < height) return setIsVertical(true)
  }, 300);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const resetCanvasDimens = () => {
    const docDimens = getDocumentDimensions();
    setScreenDimensions(docDimens);
  };

  const makeThin = () => {
    const { width, height } = getDocumentDimensions();
    setScreenDimensions({
      width,
      height: height / 3,
    });
  };

  const value = {
    snapshotsCanvasRef,
    setSnapshotsCanvasRef,
    screenDimensions,
    setScreenDimensions,
    isVertical,
    setIsVertical,
    resetCanvasDimens,
    makeThin,
    stretchFactor,
    setStretchFactor
  };

  return (
    <SnapshotsCanvasContext.Provider value={value}>
      {children}
    </SnapshotsCanvasContext.Provider>
  );
}

export default SnapshotsCanvasProvider;
