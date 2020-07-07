import React, { useState } from "react";
import getInitialBugs from "./getInitialBugs";
import eatBugAndSpawnNew from "./eatBugAndSpawnNew";
import getNewOffspring from "./getNewOffspring";
import getAverageColor from "./getAverageColor";
import eatAndSpawn2 from './eatAndSpawn2'
import getInitialBugs2 from './getInitialBugs2'
export const BugsContext = React.createContext();

function BugsProvider({ children }) {
  const [bugs, setBugs] = useState([]);
  const [bugs2,setBugs2] = useState([])
  const [populationSize, setPopulationSize] = useState(50);
  const [bugSize, setBugSize] = useState(14);
  const [maxMutationStep, setMaxMutationStep] = useState(27);
  const [maxOffspringDistance, setMaxOffspringDistance] = useState(190);
  const [avgColors, setAvgColors] = useState([]);
  const [growSpeed, setGrowSpeed] = useState(2);
  const [populationSnapshots, setPopulationSnapshots] = useState([]);

  const value = {
    bugs,
    setBugs,
    populationSize,
    setPopulationSize,
    getInitialBugs,
    bugSize,
    setBugSize,
    eatBugAndSpawnNew,
    getNewOffspring,
    maxMutationStep,
    setMaxMutationStep,
    maxOffspringDistance,
    setMaxOffspringDistance,
    avgColors,
    setAvgColors,
    getAverageColor,
    growSpeed,
    setGrowSpeed,
    populationSnapshots,
    setPopulationSnapshots,
    bugs2,
    setBugs2,
    eatAndSpawn2,
    getInitialBugs2
  };

  return <BugsContext.Provider value={value}>{children}</BugsContext.Provider>;
}

export default BugsProvider;
