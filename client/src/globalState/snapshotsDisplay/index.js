import React, { useState, useEffect, useContext } from "react";
import getDocumentDimensions from "./canvas/getDocumentDimensions";
import drawCanvas from "./canvas/drawCanvas";
import { BugsContext } from "globalState/bugs/BugsProvider";
import getOrganisms from "./svg/getOrganisms";
export const SnapshotsDisplayContext = React.createContext();
const _ = require("lodash");

function SnapshotsDisplayProvider({ children }) {
  // local state
  const [isVertical, setIsVertical] = useState(false);
  const [stretchFactor, setStretchFactor] = useState(1);
  const [thickness, setThickness] = useState(0.5);
  const [snapshotsCanvasRef, setSnapshotsCanvasRef] = useState(null);
  const [screenDimensions, setScreenDimensions] = useState(
    getDocumentDimensions()
  );
  const [organisms, setOrganisms] = useState([]);
  const [lineWidth, setLineWidth] = useState(5);
  const [displaySvg, setDisplaySvg] = useState(false);

  // global state
  const { populationSize, populationSnapshots } = useContext(BugsContext);

  // The drawing is split between two useEffect fuctions so that I can conditionally
  // change the parameters of the draw function depending on which dependency/ies changed.
  // Between the two useEffects, all dependencies are covered. This is an unusual
  // case to be sure. The logic boils down to this: If populationSnapshots is changing,
  // throttle the draw function. Don't otherwise.
  useEffect(() => {
    if (displaySvg) return;
    drawCanvas({
      snapshotsCanvasRef,
      populationSize,
      populationSnapshots,
      screenDimensions,
      isVertical,
      stretchFactor,
      thickness,
      throttle: true,
    });
  }, [populationSnapshots]);

  useEffect(() => {
    if (displaySvg) return;
    drawCanvas({
      snapshotsCanvasRef,
      populationSize,
      populationSnapshots,
      screenDimensions,
      isVertical,
      stretchFactor,
      thickness,
      throttle: false,
    });
  }, [
    screenDimensions,
    stretchFactor,
    isVertical,
    snapshotsCanvasRef,
    populationSize,
    thickness,
    displaySvg,
  ]);

  const handleResize = _.throttle(() => {
    const { width, height } = getDocumentDimensions();
    setScreenDimensions({ width, height });
    if (width < height) return setIsVertical(true);
    if (height <= width) return setIsVertical(false);
  }, 200);

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
    if (!displaySvg) return;
    const organisms = getOrganisms({
      populationSize,
      stretchFactor,
      thickness,
      screenDimensions,
      populationSnapshots,
      isVertical,
      throttle: true,
    });
    setOrganisms(organisms);
  }, [populationSnapshots]);

  useEffect(() => {
    if (!displaySvg) return;
    const organisms = getOrganisms({
      populationSize,
      stretchFactor,
      thickness,
      screenDimensions,
      populationSnapshots,
      isVertical,
      throttle: false,
    });
    setOrganisms(organisms);
  }, [
    screenDimensions,
    stretchFactor,
    isVertical,
    populationSize,
    thickness,
    displaySvg,
  ]);

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
    lineWidth,
    setLineWidth,
    organisms,
    displaySvg,
    setDisplaySvg,
  };

  return (
    <SnapshotsDisplayContext.Provider value={value}>
      {children}
    </SnapshotsDisplayContext.Provider>
  );
}

export default SnapshotsDisplayProvider;
