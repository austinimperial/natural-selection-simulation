import React, { useContext } from "react";
import { BugsContext } from "globalState/bugs/index";
import Slider from "shared/slider/index";

function PopulationSlider() {
  // global state
  const { setPopulationSize, populationSize } = useContext(BugsContext);

  return (
    <Slider
      min={10}
      max={60}
      step={5}
      initial={populationSize}
      name={"population"}
      doSomethingOnMouseUp={setPopulationSize}
      containerStyle={{
        margin: "20px 20px 0px 20px",
      }}
    />
  );
}

export default PopulationSlider;
