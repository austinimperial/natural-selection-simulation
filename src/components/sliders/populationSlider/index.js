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
  } = useContext(BugsContext);
  const { canvasDimensions } = useContext(CanvasDimensionsContext);

  const handleMouseUp = useCallback(
    (newValue) => {
      setPopulationSize(newValue);

      const newBugs = getInitialBugs(canvasDimensions, newValue, bugSize);
      setBugs(newBugs);

      const newAvgColor = getAverageColor(newBugs, populationSize);
      setAvgColors([newAvgColor]);
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
