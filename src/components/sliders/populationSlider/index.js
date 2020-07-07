import React, { useContext, useCallback } from "react";
import { BugsContext } from "globalState/bugs/index";
import { CanvasDimensionsContext } from "globalState/canvasDimensions/index";
import Slider from "shared/slider/index";

function PopulationSlider() {
  // global state
  const {
    populationSize,
    setPopulationSize,
    bugSize,
    setBugs,
    getInitialBugs,
    setAvgColors,
    getAverageColor,
    setPopulationSnapshots,
    setBugs2,
    getInitialBugs2
  } = useContext(BugsContext);
  const { canvasDimensions } = useContext(CanvasDimensionsContext);

  const handleMouseUp = useCallback(
    (newValue) => {
      const newBugs = getInitialBugs(canvasDimensions, newValue, bugSize);
      const newAvgColor = getAverageColor(newBugs, populationSize);

      setBugs(newBugs);
      setPopulationSize(newValue);
      setAvgColors([newAvgColor]);
      setPopulationSnapshots([])

    // bugs2
    const newBugs2 = getInitialBugs2(canvasDimensions, populationSize, bugSize);
    setBugs2(newBugs2)
    },
    [
      canvasDimensions,
      setBugs,
      getInitialBugs,
      bugSize,
      setAvgColors,
      getAverageColor,
      setPopulationSize,
      populationSize,
      setPopulationSnapshots,
      setBugs2,
      getInitialBugs2
    ]
  );

  return (
    <Slider
      min={10}
      max={80}
      step={5}
      initial={populationSize}
      name={"population"}
      doSomethingOnMouseUp={handleMouseUp}
      containerStyle={{
        margin: "20px 20px 0px 20px",
      }}
    />
  );
}

export default PopulationSlider;
