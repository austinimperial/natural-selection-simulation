import React, { useState, useCallback, useContext, useEffect } from "react";
import { CanvasDimensionsContext } from 'globalState/canvasDimensions/index'
import getNewOffspring from "./getNewOffspring";
import eatAndSpawnNew from "./eatAndSpawnNew";
import getInitialBugs2 from "./getInitialBugs2";
import getRandomLivingBugNode from "./getRandomLivingBugNode";
import { Node, flatten, getLivingBugNodes } from "./tree";
export const BugsContext = React.createContext();
const _ = require('lodash')

function BugsProvider({ children }) {
  // const
  const MAX_STEP_COUNT = 2000

  // local state
  const [bugs2, setBugs2] = useState(null);
  const [populationSize, setPopulationSize] = useState(50);
  const [bugSize, setBugSize] = useState(14);
  const [maxMutationStep, setMaxMutationStep] = useState(27);
  const [maxOffspringDistance, setMaxOffspringDistance] = useState(190);
  const [growSpeed, setGrowSpeed] = useState(2);
  const [populationSnapshots, setPopulationSnapshots] = useState([]);
  const [stepCount,setStepCount] = useState(0)

  // global state
  const { canvasDimensions } = useContext(CanvasDimensionsContext)

  useEffect(() => {
    const newBugs2 = getInitialBugs2(canvasDimensions, populationSize, bugSize);
    setBugs2(newBugs2);
  }, []);

  const step = useCallback((eatenBug) => {
    if (stepCount > MAX_STEP_COUNT) return (
      alert(`maximum step count of ${MAX_STEP_COUNT} reached`)
    )

    const newBugs = eatAndSpawnNew(
        eatenBug,
        bugs2,
        getRandomLivingBugNode,
        maxOffspringDistance,
        canvasDimensions,
        bugSize,
        maxMutationStep
    );

    const livingBugs = getLivingBugNodes(bugs2, true);
    const newPopulationSnapshot = livingBugs.map((eatenBug) => ({
        color: eatenBug.color
    }));

    setStepCount(prev => prev + 1)
    setBugs2(newBugs);
    setPopulationSnapshots((prevPopulationSnapshots) => [
        ...prevPopulationSnapshots,
        newPopulationSnapshot,
    ]);
  },[
    bugs2,
    maxMutationStep,
    maxOffspringDistance,
    canvasDimensions,
    bugSize,
    stepCount
  ])

  const value = {
    populationSize,
    setPopulationSize,
    bugSize,
    setBugSize,
    getNewOffspring,
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
    getInitialBugs2,
    Node,
    flatten,
    getRandomLivingBugNode,
    getLivingBugNodes,
    step,
    stepCount,
    setStepCount,
    MAX_STEP_COUNT
  };

  return <BugsContext.Provider value={value}>{children}</BugsContext.Provider>;
}

export default BugsProvider;
