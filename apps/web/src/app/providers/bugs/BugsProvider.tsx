'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { type UseFormReturn, useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import mars from '@/app/components/simulation-controls/pics/mars.png';
import { SvgDimensionsContext } from '../svg-container/SvgContainerProvider';
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

const controlsFormSchema = z.object({
  flashOnDeath: z.boolean(),
  bugSize: z.number(),
  growSpeed: z.number(),
  hungerTimer: z.number(),
  phenotypicDistance: z.number(),
  maxOffspringRadius: z.number(),
  populationSize: z.number(),
  worldWrap: z.boolean(),
  presetBgImage: z.string(),
  uploadedBgImage: z.string().optional(),
});

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
  populationSnapshots: PopulationSnapshot[];
  MAX_STEP_COUNT: number;
  setBugs: React.Dispatch<React.SetStateAction<Node>>;
  setPopulationSnapshots: React.Dispatch<
    React.SetStateAction<PopulationSnapshot[]>
  >;
  setStepCount: React.Dispatch<React.SetStateAction<number>>;
  step: (eatenBug: BugData) => void;
  stepCount: number;
  deaths: number[];
  setDeaths: React.Dispatch<React.SetStateAction<number[]>>;
  controlsForm: UseFormReturn<z.infer<typeof controlsFormSchema>>;
  bgImage: string;
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
  eatAndSpawnNew: () => defaultNode,
  flatten: () => [],
  getCustomInitialBugs: () => defaultNode,
  getInitialBugs: () => defaultNode,
  getLivingBugNodes: () => [],
  getRandomLivingBugNode: () => defaultNode,
  MAX_STEP_COUNT: 0,
  populationSnapshots: [],
  setBugs: () => {},
  setPopulationSnapshots: () => {},
  setStepCount: () => {},
  step: () => {},
  stepCount: 0,
  deaths: [],
  setDeaths: () => {},
  controlsForm: {} as unknown as UseFormReturn<
    z.infer<typeof controlsFormSchema>
  >,
  bgImage: '',
});

interface BugsProviderProps {
  children: React.ReactNode;
}

function BugsProvider({ children }: BugsProviderProps) {
  const MAX_STEP_COUNT = 3000;

  const [bugs, setBugs] = useState<Node>(defaultNode);
  const [populationSnapshots, setPopulationSnapshots] = useState<
    PopulationSnapshot[]
  >([]);
  const [stepCount, setStepCount] = useState<number>(0);
  const [deaths, setDeaths] = useState<number[]>([]);

  const { svgContainerDimensions } = useContext(
    SvgDimensionsContext
  ) as SvgDimensionsContextType;

  const controlsForm = useForm({
    resolver: zodResolver(controlsFormSchema),
    defaultValues: {
      populationSize: 50,
      bugSize: 12,
      phenotypicDistance: 8,
      maxOffspringRadius: 300,
      growSpeed: 2,
      hungerTimer: 2,
      flashOnDeath: true,
      worldWrap: true,
      presetBgImage: mars.src,
      uploadedBgImage: undefined,
    },
  });

  const {
    populationSize,
    bugSize,
    maxOffspringRadius,
    phenotypicDistance,
    worldWrap,
    presetBgImage,
    uploadedBgImage,
  } = controlsForm.watch();

  // Computed background image: uploaded image takes precedence over preset
  const bgImage = uploadedBgImage || presetBgImage;

  // biome-ignore lint/correctness/useExhaustiveDependencies: <>
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
    controlsForm,
    bugs,
    eatAndSpawnNew,
    flatten,
    getCustomInitialBugs,
    getInitialBugs,
    getLivingBugNodes,
    getRandomLivingBugNode,
    MAX_STEP_COUNT,
    populationSnapshots,
    setBugs,
    setPopulationSnapshots,
    setStepCount,
    step,
    stepCount,
    deaths,
    setDeaths,
    bgImage,
  };

  return <BugsContext.Provider value={value}>{children}</BugsContext.Provider>;
}

export default BugsProvider;
