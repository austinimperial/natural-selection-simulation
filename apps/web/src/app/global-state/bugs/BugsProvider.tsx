'use client';

import _ from 'lodash';
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
    maxOffspringDistance: number,
    svgContainerDimensions: SvgDimensions,
    bugSize: number,
    phenotypicDistance: number
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
  maxOffspringDistance: number;
  populationSize: number;
  populationSnapshots: PopulationSnapshot[];
  setBugs: React.Dispatch<React.SetStateAction<Node>>;
  setBugSize: React.Dispatch<React.SetStateAction<number>>;
  setFlashOnDeath: React.Dispatch<React.SetStateAction<boolean>>;
  setGrowSpeed: React.Dispatch<React.SetStateAction<number>>;
  setHungerTimer: React.Dispatch<React.SetStateAction<number>>;
  setPhenotypicDistance: React.Dispatch<React.SetStateAction<number>>;
  setMaxOffspringDistance: React.Dispatch<React.SetStateAction<number>>;
  setPopulationSize: React.Dispatch<React.SetStateAction<number>>;
  setPopulationSnapshots: React.Dispatch<
    React.SetStateAction<PopulationSnapshot[]>
  >;
  setStepCount: React.Dispatch<React.SetStateAction<number>>;
  step: (eatenBug: BugData) => void;
  stepCount: number;
  deaths: number[];
  setDeaths: React.Dispatch<React.SetStateAction<number[]>>;
};

export const defaultBugData: BugData = {
  id: '',
  x: 0,
  y: 0,
  isAlive: false,
  color: [0,0,0],
  orientation: 0,
  clone: false
}

export const defaultNode: Node = {
  isRoot: true,
  data: defaultBugData,
  firstChild: null,
  rightSibling: null,
}

export const BugsContext = React.createContext<BugsContextType>({
  bugs: defaultNode,
  bugSize: 0,
  eatAndSpawnNew: () => (defaultNode),
  flashOnDeath: false,
  flatten: () => [],
  getCustomInitialBugs: () => (defaultNode),
  getInitialBugs: () => (defaultNode),
  getLivingBugNodes: () => [],
  getRandomLivingBugNode: () => (defaultNode),
  growSpeed: 0,
  hungerTimer: 0,
  MAX_STEP_COUNT: 0,
  phenotypicDistance: 0,
  maxOffspringDistance: 0,
  populationSize: 0,
  populationSnapshots: [],
  setBugs: () => {},
  setBugSize: () => {},
  setFlashOnDeath: () => {},
  setGrowSpeed: () => {},
  setHungerTimer: () => {},
  setPhenotypicDistance: () => {},
  setMaxOffspringDistance: () => {},
  setPopulationSize: () => {},
  setPopulationSnapshots: () => {},
  setStepCount: () => {},
  step: () => {},
  stepCount: 0,
  deaths: [],
  setDeaths: () => {},
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
  const [maxOffspringDistance, setMaxOffspringDistance] = useState<number>(300);
  const [growSpeed, setGrowSpeed] = useState<number>(2);
  const [populationSnapshots, setPopulationSnapshots] = useState<
    PopulationSnapshot[]
  >([]);
  const [hungerTimer, setHungerTimer] = useState<number>(2);
  const [stepCount, setStepCount] = useState<number>(0);
  const [flashOnDeath, setFlashOnDeath] = useState<boolean>(true);
  const [deaths, setDeaths] = useState<number[]>([]);

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
        maxOffspringDistance,
        svgContainerDimensions,
        bugSize,
        phenotypicDistance
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
      maxOffspringDistance,
      svgContainerDimensions,
      bugSize,
      stepCount,
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
    maxOffspringDistance,
    populationSize,
    populationSnapshots,
    setBugs,
    setBugSize,
    setFlashOnDeath,
    setGrowSpeed,
    setHungerTimer,
    setPhenotypicDistance,
    setMaxOffspringDistance,
    setPopulationSize,
    setPopulationSnapshots,
    setStepCount,
    step,
    stepCount,
    deaths,
    setDeaths,
  };

  return <BugsContext.Provider value={value}>{children}</BugsContext.Provider>;
}

export default BugsProvider;
