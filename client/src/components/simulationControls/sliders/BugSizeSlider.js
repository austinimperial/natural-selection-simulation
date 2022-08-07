import React, { useContext } from "react";
import { BugsContext } from "globalState/bugs/BugsProvider";
import Slider from "shared/slider/index";

function BugSizeSlider() {
  // global state
  const { setBugSize, bugSize } = useContext(BugsContext);

  return (
      <Slider
        min={4}
        max={70}
        step={2}
        initial={bugSize}
        name={"bug size"}
        unit={"px"}
        doSomethingOnChange={setBugSize}
        sliderWidth={"150px"}
        containerStyle={{
          width: "200px",
        }}
      />
  );
}

export default BugSizeSlider;
