import React, { useContext, useCallback } from "react";
import { BugsContext } from "globalState/bugs/index";
import { SvgDimensionsContext } from "globalState/svgContainerDimensions/index";
import Slider from "shared/slider/index";

function PopulationSlider() {
  // global state
  const {
    populationSize,
    setPopulationSize,
    bugSize,
    setPopulationSnapshots,
    setBugs2,
    getInitialBugs,
    setStepCount
  } = useContext(BugsContext);
  const { svgContainerDimensions } = useContext(SvgDimensionsContext);

  const handleMouseUp = useCallback(
    (newValue) => {
      const newBugs2 = getInitialBugs(svgContainerDimensions, newValue, bugSize);
      setBugs2(newBugs2);
      setPopulationSize(newValue);
      setPopulationSnapshots([]);
      setStepCount(0)
    },
    [
      svgContainerDimensions,
      bugSize,
      setPopulationSize,
      setPopulationSnapshots,
      setBugs2,
      getInitialBugs,
      setStepCount
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
