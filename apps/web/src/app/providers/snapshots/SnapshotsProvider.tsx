'use client';

import _ from 'lodash';
import React, { type RefObject, useContext, useEffect, useState } from 'react';
import { BugsContext } from '../bugs/BugsProvider';
import drawCanvas from './canvas/drawCanvas';
import getDocumentDimensions from './canvas/getDocumentDimensions';
import getOrganisms from './svg/getOrganisms';

export type SnapshotDisplayType = 'canvas' | 'svg';

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

type SnapshotsContext = {
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
  snapshotDisplayType: SnapshotDisplayType;
  setSnapshotDisplayType: (value: SnapshotDisplayType) => void;
};

export const SnapshotsContext = React.createContext<SnapshotsContext>(
  {} as SnapshotsContext
);

function SnapshotsDisplayProvider({ children }: { children: React.ReactNode }) {
  const [stretchFactor, setStretchFactor] = useState(1);
  const [thickness, setThickness] = useState(0.5);
  const [snapshotsCanvasRef, setSnapshotsCanvasRef] =
    useState<RefObject<HTMLCanvasElement> | null>(null);
  const [organisms, setOrganisms] = useState<Organism[]>([]);
  const [lineWidth, setLineWidth] = useState(5);
  const [snapshotDisplayType, setSnapshotDisplayType] =
    useState<SnapshotDisplayType>('canvas');
  const [screenDimensions, setScreenDimensions] = useState({
    width: 0,
    height: 0,
  });

  const { controlsForm, populationSnapshots } = useContext(BugsContext);
  const { populationSize } = controlsForm.watch();

  // The drawing is split between two useEffect fuctions so that I can conditionally
  // change the parameters of the draw function depending on which dependency/ies changed.
  // Between the two useEffects, all dependencies are covered. This is an unusual
  // case to be sure. The logic boils down to this: If populationSnapshots is changing,
  // throttle the draw function. Don't otherwise.
  useEffect(() => {
    if (snapshotDisplayType !== 'canvas') return;
    drawCanvas({
      snapshotsCanvasRef,
      populationSize,
      populationSnapshots,
      screenDimensions,
      stretchFactor,
      thickness,
      throttle: true,
    });
  }, [populationSnapshots]);

  useEffect(() => {
    if (snapshotDisplayType !== 'canvas') return;
    drawCanvas({
      snapshotsCanvasRef,
      populationSize,
      populationSnapshots,
      screenDimensions,
      stretchFactor,
      thickness,
      throttle: false,
    });
  }, [
    screenDimensions,
    stretchFactor,
    snapshotsCanvasRef,
    populationSize,
    thickness,
    snapshotDisplayType,
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
    if (snapshotDisplayType !== 'svg') return;
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
    if (snapshotDisplayType !== 'svg') return;
    const organisms = getOrganisms({
      populationSize,
      stretchFactor,
      thickness,
      screenDimensions,
      populationSnapshots,
      throttle: false,
    });
    setOrganisms(organisms);
  }, [
    screenDimensions,
    stretchFactor,
    populationSize,
    thickness,
    snapshotDisplayType,
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
    snapshotDisplayType,
    setSnapshotDisplayType,
  };

  return (
    <SnapshotsContext.Provider value={value}>
      {children}
    </SnapshotsContext.Provider>
  );
}

export default SnapshotsDisplayProvider;
