import React, { useState, useEffect, useContext } from "react";
import getDocumentDimensions from "./getDocumentDimensions";
import drawCanvas from "./drawCanvas";
import { BugsContext } from "globalState/bugs/index";
import { getLinePaths, getOrganismList } from './lineSnapshots'
export const SnapshotsCanvasContext = React.createContext();
const _ = require("lodash");

function SnapshotsCanvasProvider({ children }) {
  // local state
  const [isVertical, setIsVertical] = useState(false);
  const [stretchFactor,setStretchFactor] = useState(1)
  const [thickness,setThickness] = useState(0.5)
  const [snapshotsCanvasRef, setSnapshotsCanvasRef] = useState(null);
  const [screenDimensions, setScreenDimensions] = useState(
    getDocumentDimensions()
  );
  const [organismLinePaths,setOrganismLinePaths] = useState([])
  const [lineWidth,setLineWidth] = useState(5)


  // global state
  const { populationSize, populationSnapshots } = useContext(BugsContext);

  // The drawing is split between two useEffect fuctions so that I can conditionally
  // change the parameters of drawCanvas depending on which dependency/ies changed.
  // Between the two useEffects, all dependencies are covered. This is an unusual
  // case to be sure. The logic boils down to this: If populationSnapshots is changing,
  // throttle drawCanvas. Don't otherwise.
  useEffect(() => {
    drawCanvas({
      snapshotsCanvasRef,
      populationSize,
      populationSnapshots,
      screenDimensions,
      isVertical,
      stretchFactor,
      thickness,
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
      thickness,
      throttle:false,
    });
  }, [screenDimensions,stretchFactor,isVertical,snapshotsCanvasRef,populationSize,thickness]);

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

  useEffect(() => {
    const orgList = getOrganismList(populationSnapshots )
    const linePaths = getLinePaths({
      organismList: orgList,
      populationSnapshots,
      stretchFactor,
      thickness,
      populationSize,
      screenDimensions,
    })
    setOrganismLinePaths(linePaths)
  },[
    populationSnapshots,
    populationSize,
    stretchFactor,
    thickness,
    screenDimensions
  ])

  const value = {
    snapshotsCanvasRef,
    setSnapshotsCanvasRef,
    screenDimensions,
    setScreenDimensions,
    isVertical,
    setIsVertical,
    resetCanvasDimens,
    stretchFactor,
    setStretchFactor,
    thickness,
    setThickness,
    organismLinePaths,
    lineWidth,
    setLineWidth
  };

  return (
    <SnapshotsCanvasContext.Provider value={value}>
      {children}
    </SnapshotsCanvasContext.Provider>
  );
}

export default SnapshotsCanvasProvider;
