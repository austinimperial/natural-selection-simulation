import React, { useState, useCallback, useContext, useEffect } from "react";
import { SvgDimensionsContext } from "globalState/svgContainerDimensions/index";
import eatAndSpawnNew from "./eatAndSpawnNew";
import getInitialBugs from "./getInitialBugs";
import getCustomInitialBugs from "./getCustomInitialBugs"
import getRandomLivingBugNode from "./getRandomLivingBugNode";
import { Node, flatten, getLivingBugNodes } from "./tree";
export const BugsContext = React.createContext();
const _ = require("lodash");

function BugsProvider({ children }) {
  // const
  const MAX_STEP_COUNT = 3000;

  // local state
  const [bugs, setBugs] = useState(null);
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
    const newbugs = getInitialBugs(
      svgContainerDimensions,
      populationSize,
      bugSize
    );
    setBugs(newbugs);
  }, []);

  const step = useCallback(
    (eatenBug) => {
      if (stepCount > MAX_STEP_COUNT)
        return alert(`maximum step count of ${MAX_STEP_COUNT} reached`);

      const newBugs = eatAndSpawnNew(
        eatenBug,
        bugs,
        getRandomLivingBugNode,
        maxOffspringDistance,
        svgContainerDimensions,
        bugSize,
        maxMutationStep
      );

      const livingBugs = getLivingBugNodes(bugs, true);
      const newPopulationSnapshot = livingBugs.map((eatenBug) => ({
        color: eatenBug.color,
        id: eatenBug.id,
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
    bugs,
    setBugs,
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
    getCustomInitialBugs
  };

  return <BugsContext.Provider value={value}>{children}</BugsContext.Provider>;
}

export default BugsProvider;
