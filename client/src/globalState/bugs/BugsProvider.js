import React, { useState, useCallback, useContext, useEffect } from "react";
import { SvgDimensionsContext } from "globalState/svgContainerDimensions/index";
import eatAndSpawnNew from "./eatAndSpawnNew";
import getInitialBugs from "./getInitialBugs";
import getCustomInitialBugs from "./getCustomInitialBugs";
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
  const [maxOffspringDistance, setMaxOffspringDistance] = useState(300);
  const [growSpeed, setGrowSpeed] = useState(2);
  const [populationSnapshots, setPopulationSnapshots] = useState([]);
  const [hungerTimer, setHungerTimer] = useState(3.5);
  const [stepCount, setStepCount] = useState(0);
  const [flashOnDeath, setFlashOnDeath] = useState(true);
  const [deaths, setDeaths] = useState([]);

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
    maxMutationStep,
    maxOffspringDistance,
    Node,
    populationSize,
    populationSnapshots,
    setBugs,
    setBugSize,
    setFlashOnDeath,
    setGrowSpeed,
    setHungerTimer,
    setMaxMutationStep,
    setMaxOffspringDistance,
    setPopulationSize,
    setPopulationSnapshots,
    setStepCount,
    step,
    stepCount,
    deaths,
    setDeaths
  };

  return <BugsContext.Provider value={value}>{children}</BugsContext.Provider>;
}

export default BugsProvider;
