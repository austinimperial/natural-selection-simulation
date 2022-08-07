import React, { useContext } from "react";
import { BugsContext } from "globalState/bugs/BugsProvider";
import Slider from "shared/slider/Slider";

function HungerTimerSlider() {
  // global state
  const { hungerTimer, setHungerTimer } = useContext(BugsContext);

  return (
      <Slider
        min={1}
        max={15}
        step={0.25}
        initial={hungerTimer}
        name={"hunger timer (seconds)"}
        doSomethingOnMouseUp={setHungerTimer}
        sliderWidth={"150px"}
        containerStyle={{
          width: "200px",
        }}
      />
  );
}

export default HungerTimerSlider;
