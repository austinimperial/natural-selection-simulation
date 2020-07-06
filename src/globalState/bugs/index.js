import React, { useState } from "react";
import getInitialBugs from "./getInitialBugs";
import eatBugAndSpawnNew from "./eatBugAndSpawnNew";
import getNewOffspring from "./getNewOffspring";
import getAverageColor from "./getAverageColor";
export const BugsContext = React.createContext();

function BugsProvider({ children }) {
  const [bugs, setBugs] = useState([]);
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
  };

  return <BugsContext.Provider value={value}>{children}</BugsContext.Provider>;
}

export default BugsProvider;
