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
    setAvgColors,
    getAverageColor,
    setPopulationSnapshots,
    setBugs2,
    getInitialBugs2,
    getLivingBugs
  } = useContext(BugsContext);
  const { canvasDimensions } = useContext(CanvasDimensionsContext);

  const handleMouseUp = useCallback(
    (newValue) => {
      const newBugs2 = getInitialBugs2(canvasDimensions, newValue, bugSize);
      const newAvgColor = getAverageColor(getLivingBugs(newBugs2), populationSize);
      setBugs2(newBugs2)
      setPopulationSize(newValue);
      setAvgColors([newAvgColor]);
      setPopulationSnapshots([])
    },
    [
      canvasDimensions,
      bugSize,
      setAvgColors,
      getAverageColor,
      setPopulationSize,
      populationSize,
      setPopulationSnapshots,
      setBugs2,
      getInitialBugs2,
      getLivingBugs
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
