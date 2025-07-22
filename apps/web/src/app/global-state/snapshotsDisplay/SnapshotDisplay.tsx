'use client';

import _ from 'lodash';
import React, { type RefObject, useContext, useEffect, useState } from 'react';
import { BugsContext } from '../bugs/BugsProvider';
import drawCanvas from './canvas/drawCanvas';
import getDocumentDimensions from './canvas/getDocumentDimensions';
import getOrganisms from './svg/getOrganisms';

export type Point = {
  x: number;
  y: number;
};

export type Organism = {
  id: string;
  pointList: Point[];
  color: number[];
  path: string;
  formattedColor: string;
};

type SnapshotsDisplayContextType = {
  snapshotsCanvasRef: RefObject<HTMLCanvasElement> | null;
  setSnapshotsCanvasRef: React.Dispatch<
    React.SetStateAction<RefObject<HTMLCanvasElement> | null>
  >;
  screenDimensions: {
    width: number;
    height: number;
  };
  setScreenDimensions: React.Dispatch<
    React.SetStateAction<{ width: number; height: number }>
  >;
  resetCanvasDimens: () => void;
  stretchFactor: number;
  setStretchFactor: React.Dispatch<React.SetStateAction<number>>;
  thickness: number;
  setThickness: React.Dispatch<React.SetStateAction<number>>;
  lineWidth: number;
  setLineWidth: React.Dispatch<React.SetStateAction<number>>;
  organisms: Organism[];
  isShowingSvg: boolean;
  setDisplaySvg: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SnapshotsDisplayContext =
  React.createContext<SnapshotsDisplayContextType>(
    {} as SnapshotsDisplayContextType
  );

function SnapshotsDisplayProvider({ children }: { children: React.ReactNode }) {
  const [stretchFactor, setStretchFactor] = useState(1);
  const [thickness, setThickness] = useState(0.5);
  const [snapshotsCanvasRef, setSnapshotsCanvasRef] =
    useState<RefObject<HTMLCanvasElement> | null>(null);
  const [organisms, setOrganisms] = useState<Organism[]>([]);
  const [lineWidth, setLineWidth] = useState(5);
  const [isShowingSvg, setDisplaySvg] = useState(false);
  const [screenDimensions, setScreenDimensions] = useState({
    width: 0,
    height: 0,
  });

  const { populationSize, populationSnapshots } = useContext(BugsContext);

  // The drawing is split between two useEffect fuctions so that I can conditionally
  // change the parameters of the draw function depending on which dependency/ies changed.
  // Between the two useEffects, all dependencies are covered. This is an unusual
  // case to be sure. The logic boils down to this: If populationSnapshots is changing,
  // throttle the draw function. Don't otherwise.
  useEffect(() => {
    if (isShowingSvg) return;
    drawCanvas({
      snapshotsCanvasRef,
      populationSize,
      populationSnapshots,
      screenDimensions,
      stretchFactor,
      thickness,
      throttle: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [populationSnapshots]);

  useEffect(() => {
    if (isShowingSvg) return;
    drawCanvas({
      snapshotsCanvasRef,
      populationSize,
      populationSnapshots,
      screenDimensions,
      stretchFactor,
      thickness,
      throttle: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    screenDimensions,
    stretchFactor,
    snapshotsCanvasRef,
    populationSize,
    thickness,
    isShowingSvg,
  ]);

  const handleResize = _.throttle(() => {
    const { width, height } = getDocumentDimensions();
    setScreenDimensions({ width, height });
  }, 200);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const resetCanvasDimens = () => {
    const docDimens = getDocumentDimensions();
    setScreenDimensions(docDimens);
  };

  useEffect(() => {
    if (!isShowingSvg) return;
    const organisms = getOrganisms({
      populationSize,
      stretchFactor,
      thickness,
      screenDimensions,
      populationSnapshots,
      throttle: true,
    });
    setOrganisms(organisms);
  }, [populationSnapshots]);

  useEffect(() => {
    if (!isShowingSvg) return;
    const organisms = getOrganisms({
      populationSize,
      stretchFactor,
      thickness,
      screenDimensions,
      populationSnapshots,
      throttle: false,
    });
    setOrganisms(organisms);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    screenDimensions,
    stretchFactor,
    populationSize,
    thickness,
    isShowingSvg,
  ]);

  const value = {
    snapshotsCanvasRef,
    setSnapshotsCanvasRef,
    screenDimensions,
    setScreenDimensions,
    resetCanvasDimens,
    stretchFactor,
    setStretchFactor,
    thickness,
    setThickness,
    lineWidth,
    setLineWidth,
    organisms,
    isShowingSvg,
    setDisplaySvg,
  };

  return (
    <SnapshotsDisplayContext.Provider value={value}>
      {children}
    </SnapshotsDisplayContext.Provider>
  );
}

export default SnapshotsDisplayProvider;
