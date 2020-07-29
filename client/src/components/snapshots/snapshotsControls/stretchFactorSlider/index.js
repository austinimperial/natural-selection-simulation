import React, { useContext } from "react";
import { SnapshotsDisplayContext } from "globalState/snapshotsDisplay/index";
import Slider from "shared/slider/index";

function StretchFactorSlider() {
  // global state
  const { stretchFactor, setStretchFactor } = useContext(SnapshotsDisplayContext);

  const handleMouseUp = (newValue) => {
    setStretchFactor(newValue);
  };

  return (
    <Slider
      min={1}
      max={25}
      step={0.5}
      initial={stretchFactor}
      name={"stretch factor"}
      doSomethingOnMouseUp={handleMouseUp}
      sliderWidth="150px"
      containerStyle={{
        width: "200px",
      }}
    />
  );
}

export default StretchFactorSlider;
