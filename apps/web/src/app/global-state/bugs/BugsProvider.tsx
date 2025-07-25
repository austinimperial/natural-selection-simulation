'use client';

import React, { useCallback, useContext, useEffect, useState } from 'react';
import { SvgDimensionsContext } from '../svgContainerDimensions/index';
import eatAndSpawnNew from './eatAndSpawnNew';
import getCustomInitialBugs from './getCustomInitialBugs';
import getInitialBugs from './getInitialBugs';
import getRandomLivingBugNode from './getRandomLivingBugNode';
import { flatten, getLivingBugNodes, type Node } from './tree';

export type BugData = {
  id: string;
  x: number;
  y: number;
  isAlive: boolean;
  color: [number, number, number];
  orientation: number;
  clone: boolean;
};

export type PopulationSnapshot = {
  color: [number, number, number];
  id: string;
  clone: boolean;
}[];

export type SvgDimensions = {
  width: number;
  height: number;
};

export type CanvasOffset = {
  left: number;
  top: number;
};

export type SvgDimensionsContextType = {
  svgContainerDimensions: SvgDimensions;
  setSvgContainerDimensions: React.Dispatch<
    React.SetStateAction<SvgDimensions>
  >;
  canvasOffset: CanvasOffset;
  setCanvasOffset: React.Dispatch<React.SetStateAction<CanvasOffset>>;
};

export type BugsContextType = {
  bugs: Node;
  bugSize: number;
  eatAndSpawnNew: (
    eatenBug: BugData,
    bugs: Node,
    getRandomLivingBugNode: (bugs: Node) => Node,
    maxOffspringRadius: number,
    svgContainerDimensions: SvgDimensions,
    bugSize: number,
    phenotypicDistance: number,
    worldWrap: boolean
  ) => Node;
  flashOnDeath: boolean;
  flatten: (node: Node) => Node[];
  getCustomInitialBugs: (
    svgContainerDimensions: SvgDimensions,
    bugSize: number,
    customColorArray: PopulationSnapshot
  ) => Node;
  getInitialBugs: (
    svgContainerDimensions: SvgDimensions,
    populationSize: number,
    bugSize: number
  ) => Node;
  getLivingBugNodes: (node: Node) => Node[];
  getRandomLivingBugNode: (bugs: Node) => Node;
  growSpeed: number;
  hungerTimer: number;
  MAX_STEP_COUNT: number;
  phenotypicDistance: number;
  maxOffspringRadius: number;
  populationSize: number;
  populationSnapshots: PopulationSnapshot[];
  setBugs: React.Dispatch<React.SetStateAction<Node>>;
  setBugSize: React.Dispatch<React.SetStateAction<number>>;
  setFlashOnDeath: React.Dispatch<React.SetStateAction<boolean>>;
  setGrowSpeed: React.Dispatch<React.SetStateAction<number>>;
  setHungerTimer: React.Dispatch<React.SetStateAction<number>>;
  setPhenotypicDistance: React.Dispatch<React.SetStateAction<number>>;
  setmaxOffspringRadius: React.Dispatch<React.SetStateAction<number>>;
  setPopulationSize: React.Dispatch<React.SetStateAction<number>>;
  setPopulationSnapshots: React.Dispatch<
    React.SetStateAction<PopulationSnapshot[]>
  >;
  setStepCount: React.Dispatch<React.SetStateAction<number>>;
  step: (eatenBug: BugData) => void;
  stepCount: number;
  deaths: number[];
  setDeaths: React.Dispatch<React.SetStateAction<number[]>>;
  worldWrap: boolean;
  setWorldWrap: React.Dispatch<React.SetStateAction<boolean>>;
};

export const defaultBugData: BugData = {
  id: '',
  x: 0,
  y: 0,
  isAlive: false,
  color: [0, 0, 0],
  orientation: 0,
  clone: false,
};

export const defaultNode: Node = {
  isRoot: true,
  data: defaultBugData,
  firstChild: null,
  rightSibling: null,
};

export const BugsContext = React.createContext<BugsContextType>({
  bugs: defaultNode,
  bugSize: 0,
  eatAndSpawnNew: () => defaultNode,
  flashOnDeath: false,
  flatten: () => [],
  getCustomInitialBugs: () => defaultNode,
  getInitialBugs: () => defaultNode,
  getLivingBugNodes: () => [],
  getRandomLivingBugNode: () => defaultNode,
  growSpeed: 0,
  hungerTimer: 0,
  MAX_STEP_COUNT: 0,
  phenotypicDistance: 0,
  maxOffspringRadius: 0,
  populationSize: 0,
  populationSnapshots: [],
  setBugs: () => {},
  setBugSize: () => {},
  setFlashOnDeath: () => {},
  setGrowSpeed: () => {},
  setHungerTimer: () => {},
  setPhenotypicDistance: () => {},
  setmaxOffspringRadius: () => {},
  setPopulationSize: () => {},
  setPopulationSnapshots: () => {},
  setStepCount: () => {},
  step: () => {},
  stepCount: 0,
  deaths: [],
  setDeaths: () => {},
  worldWrap: false,
  setWorldWrap: () => {},
});

interface BugsProviderProps {
  children: React.ReactNode;
}

function BugsProvider({ children }: BugsProviderProps) {
  const MAX_STEP_COUNT = 3000;

  const [bugs, setBugs] = useState<Node>(defaultNode);
  const [populationSize, setPopulationSize] = useState<number>(50);
  const [bugSize, setBugSize] = useState<number>(12);
  const [phenotypicDistance, setPhenotypicDistance] = useState<number>(8);
  const [maxOffspringRadius, setmaxOffspringRadius] = useState<number>(300);
  const [growSpeed, setGrowSpeed] = useState<number>(2);
  const [populationSnapshots, setPopulationSnapshots] = useState<
    PopulationSnapshot[]
  >([]);
  const [hungerTimer, setHungerTimer] = useState<number>(2);
  const [stepCount, setStepCount] = useState<number>(0);
  const [flashOnDeath, setFlashOnDeath] = useState<boolean>(true);
  const [deaths, setDeaths] = useState<number[]>([]);
  const [worldWrap, setWorldWrap] = useState<boolean>(true);

  const { svgContainerDimensions } = useContext(
    SvgDimensionsContext
  ) as SvgDimensionsContextType;

  useEffect(() => {
    const newbugs = getInitialBugs(
      svgContainerDimensions,
      populationSize,
      bugSize
    );
    setBugs(newbugs);
  }, []);

  const step = useCallback(
    (eatenBug: BugData) => {
      if (stepCount > MAX_STEP_COUNT)
        return alert(`maximum step count of ${MAX_STEP_COUNT} reached`);

      const newBugs = eatAndSpawnNew(
        eatenBug,
        bugs!,
        getRandomLivingBugNode,
        maxOffspringRadius,
        svgContainerDimensions,
        bugSize,
        phenotypicDistance,
        worldWrap
      );

      const livingBugs = getLivingBugNodes(bugs).map((bug) => bug.data);
      const newPopulationSnapshot = livingBugs.map((bug) => ({
        color: bug?.color ?? [0, 0, 0],
        id: bug?.id ?? '',
        clone: bug?.clone ?? false,
      }));

      setStepCount((prev) => prev + 1);
      setBugs(newBugs);
      setPopulationSnapshots((prevPopulationSnapshots) => [
        ...prevPopulationSnapshots,
        newPopulationSnapshot,
      ]);
    },
    [
      bugs,
      phenotypicDistance,
      maxOffspringRadius,
      svgContainerDimensions,
      bugSize,
      stepCount,
      worldWrap,
    ]
  );

  const value: BugsContextType = {
    bugs,
    bugSize,
    eatAndSpawnNew,
    flashOnDeath,
    flatten,
    getCustomInitialBugs,
    getInitialBugs,
    getLivingBugNodes,
    getRandomLivingBugNode,
    growSpeed,
    hungerTimer,
    MAX_STEP_COUNT,
    phenotypicDistance,
    maxOffspringRadius,
    populationSize,
    populationSnapshots,
    setBugs,
    setBugSize,
    setFlashOnDeath,
    setGrowSpeed,
    setHungerTimer,
    setPhenotypicDistance,
    setmaxOffspringRadius,
    setPopulationSize,
    setPopulationSnapshots,
    setStepCount,
    step,
    stepCount,
    deaths,
    setDeaths,
    worldWrap,
    setWorldWrap,
  };

  return <BugsContext.Provider value={value}>{children}</BugsContext.Provider>;
}

export default BugsProvider;
