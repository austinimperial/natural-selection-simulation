import React, { useState } from "react";
import getInitialBugs from "./getInitialBugs";
import eatBug from "./eatBug";
import spawnNewOffspring from "./spawnNewOffspring";
export const BugsContext = React.createContext();
const _ = require('lodash')

function BugsProvider({ children }) {
  const [bugs, setBugs] = useState([]);
  const [populationSize, setPopulationSize] = useState(20);
  const [bugSize, setBugSize] = useState(20);
  const [maxMutationStep, setMaxMutationStep] = useState(27);
  const [maxOffspringDistance, setMaxOffspringDistance] = useState(120);

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
  };

  return <BugsContext.Provider value={value}>{children}</BugsContext.Provider>;
}

export default BugsProvider;
