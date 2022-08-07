import React, { useContext } from "react";
import { SnapshotsDisplayContext } from "globalState/snapshotsDisplay/SnapshotDisplay";
import Slider from "shared/slider/Slider";

function StretchFactorSlider() {
  // global state
  const { stretchFactor, setStretchFactor } = useContext(SnapshotsDisplayContext);

  const handleMouseUp = (newValue) => {
    setStretchFactor(newValue);
  };

  return (
    <Slider
      min={0.8}
      max={25}
      step={0.2}
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
