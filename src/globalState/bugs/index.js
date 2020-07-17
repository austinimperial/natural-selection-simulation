import React, { useState, useCallback, useContext, useEffect } from "react";
import { SvgDimensionsContext } from "globalState/svgContainerDimensions/index";
import eatAndSpawnNew from "./eatAndSpawnNew";
import getInitialBugs from "./getInitialBugs";
import getRandomLivingBugNode from "./getRandomLivingBugNode";
import { Node, flatten, getLivingBugNodes } from "./tree";
export const BugsContext = React.createContext();
const _ = require("lodash");

function BugsProvider({ children }) {
  // const
  const MAX_STEP_COUNT = 3000;

  // local state
  const [bugs2, setBugs2] = useState(null);
  const [populationSize, setPopulationSize] = useState(50);
  const [bugSize, setBugSize] = useState(12);
  const [maxMutationStep, setMaxMutationStep] = useState(27);
  const [maxOffspringDistance, setMaxOffspringDistance] = useState(250);
  const [growSpeed, setGrowSpeed] = useState(2);
  const [populationSnapshots, setPopulationSnapshots] = useState([]);
  const [stepCount, setStepCount] = useState(0);

  // global state
  const { svgContainerDimensions } = useContext(SvgDimensionsContext);

  useEffect(() => {
    const newBugs2 = getInitialBugs(
      svgContainerDimensions,
      populationSize,
      bugSize
    );
    setBugs2(newBugs2);
  }, []);

  const step = useCallback(
    (eatenBug) => {
      if (stepCount > MAX_STEP_COUNT)
        return alert(`maximum step count of ${MAX_STEP_COUNT} reached`);

      const newBugs = eatAndSpawnNew(
        eatenBug,
        bugs2,
        getRandomLivingBugNode,
        maxOffspringDistance,
        svgContainerDimensions,
        bugSize,
        maxMutationStep
      );

      const livingBugs = getLivingBugNodes(bugs2, true);
      const newPopulationSnapshot = livingBugs.map((eatenBug) => ({
        color: eatenBug.color,
        id: eatenBug.id,
      }));

      setStepCount((prev) => prev + 1);
      setBugs2(newBugs);
      setPopulationSnapshots((prevPopulationSnapshots) => [
        ...prevPopulationSnapshots,
        newPopulationSnapshot,
      ]);
    },
    [
      bugs2,
      maxMutationStep,
      maxOffspringDistance,
      svgContainerDimensions,
      bugSize,
      stepCount,
    ]
  );

  const value = {
    populationSize,
    setPopulationSize,
    bugSize,
    setBugSize,
    maxMutationStep,
    setMaxMutationStep,
    maxOffspringDistance,
    setMaxOffspringDistance,
    growSpeed,
    setGrowSpeed,
    populationSnapshots,
    setPopulationSnapshots,
    bugs2,
    setBugs2,
    eatAndSpawnNew,
    getInitialBugs,
    Node,
    flatten,
    getRandomLivingBugNode,
    getLivingBugNodes,
    step,
    stepCount,
    setStepCount,
    MAX_STEP_COUNT,
  };

  return <BugsContext.Provider value={value}>{children}</BugsContext.Provider>;
}

export default BugsProvider;
