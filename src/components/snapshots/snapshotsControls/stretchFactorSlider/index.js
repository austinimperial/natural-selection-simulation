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
      max={20}
      step={1}
      initial={stretchFactor}
      name={"stretch factor"}
      doSomethingOnMouseUp={handleMouseUp}
      containerStyle={{
        margin: "0px 10px 0px 10px",
      }}
    />
  );
}

export default StretchFactorSlider;
