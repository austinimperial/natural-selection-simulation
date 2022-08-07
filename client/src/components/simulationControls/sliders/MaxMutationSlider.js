import React, { useContext } from "react";
import { BugsContext } from "globalState/bugs/BugsProvider";
import Slider from "shared/slider/index";

function GrowSpeedSlider() {
  // global state
  const { maxMutationStep, setMaxMutationStep } = useContext(BugsContext);

  return (
      <Slider
        min={0}
        max={255}
        step={3}
        initial={maxMutationStep}
        name={"max mutation step"}
        doSomethingOnMouseUp={setMaxMutationStep}
        sliderWidth={"150px"}
        containerStyle={{
          width: "200px",
        }}
      />
  );
}

export default GrowSpeedSlider;
