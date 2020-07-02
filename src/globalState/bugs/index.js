import React, { useState } from "react";
import getInitialBugs from "./getInitialBugs";
import eatBug from "./eatBug";
import spawnNewOffspring from "./spawnNewOffspring";
import getAverageColor from "./getAverageColor";
export const BugsContext = React.createContext();

function BugsProvider({ children }) {
  const [bugs, setBugs] = useState([]);
  const [populationSize, setPopulationSize] = useState(20);
  const [bugSize, setBugSize] = useState(20);
  const [maxMutationStep, setMaxMutationStep] = useState(15);
  const [maxOffspringDistance, setMaxOffspringDistance] = useState(80);
  const [avgColors, setAvgColors] = useState([]);

  const value = {
    bugs,
    setBugs,
    populationSize,
    setPopulationSize,
    getInitialBugs,
    bugSize,
    setBugSize,
    eatBug,
    spawnNewOffspring,
    maxMutationStep,
    setMaxMutationStep,
    maxOffspringDistance,
    setMaxOffspringDistance,
    avgColors,
    setAvgColors,
    getAverageColor,
  };

  return <BugsContext.Provider value={value}>{children}</BugsContext.Provider>;
}

export default BugsProvider;
