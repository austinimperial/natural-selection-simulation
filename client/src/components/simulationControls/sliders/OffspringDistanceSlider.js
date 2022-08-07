import React, { useContext } from "react";
import { BugsContext } from "globalState/bugs/BugsProvider";
import Slider from "shared/slider/Slider";

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
        sliderWidth={"150px"}
        containerStyle={{
          width: "220px",
        }}
      />
  );
}

export default OffspringDistanceSlider;
