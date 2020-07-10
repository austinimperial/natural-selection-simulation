import React, { useContext } from "react";
import { BugsContext } from "globalState/bugs/index";
import Slider from "shared/slider/index";

function OffspringDistanceSlider() {
  // global state
  const { setMaxOffspringDistance, maxOffspringDistance } = useContext(
    BugsContext
  );

  return (
    <Slider
      min={10}
      max={500}
      step={5}
      initial={maxOffspringDistance}
      name={"max offspring distance"}
      unit={"px"}
      doSomethingOnMouseUp={setMaxOffspringDistance}
      containerStyle={{
        margin: "20px 20px 0px 20px",
      }}
    />
  );
}

export default OffspringDistanceSlider;
