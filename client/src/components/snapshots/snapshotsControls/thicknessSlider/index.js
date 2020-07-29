import React, { useContext } from "react";
import { SnapshotsDisplayContext } from "globalState/snapshotsDisplay/index";
import Slider from "shared/slider/index";

function StretchFactorSlider() {
  // global state
  const { thickness, setThickness } = useContext(SnapshotsDisplayContext);

  const handleMouseUp = (newValue) => {
    setThickness(newValue);
  };

  return (
    <Slider
      min={0.1}
      max={1}
      step={0.1}
      initial={thickness}
      name={"thickness"}
      doSomethingOnMouseUp={handleMouseUp}
      sliderWidth="150px"
      containerStyle={{
        width: "200px",
      }}
    />
  );
}

export default StretchFactorSlider;
