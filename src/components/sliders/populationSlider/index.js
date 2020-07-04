import React, { useContext, useCallback } from "react";
import { BugsContext } from "globalState/bugs/index";
import { CanvasDimensionsContext } from 'globalState/canvasDimensions/index'
import Slider from "shared/slider/index";

function PopulationSlider() {
  // global state
  const { populationSize, setPopulationSize, bugs, bugSize, setBugs, getInitialBugs, setAvgColors, getAverageColor } = useContext(BugsContext);
  const { canvasDimensions } = useContext(CanvasDimensionsContext)

  const handleMouseUp = useCallback((newValue) => {
    setPopulationSize(newValue)
    getInitialBugs(canvasDimensions, newValue, setBugs, bugSize)
    setAvgColors([getAverageColor(bugs,newValue)])
  },[canvasDimensions,setBugs,getInitialBugs,bugSize,setAvgColors,bugs,getAverageColor,setPopulationSize])

  return (
    <Slider
      min={10}
      max={60}
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
