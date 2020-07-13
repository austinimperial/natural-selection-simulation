import React, { useContext } from "react";
import { SnapshotsCanvasContext } from "globalState/snapshotsCanvas/index";
import Slider from "shared/slider/index";

function StretchFactorSlider() {
  // global state
  const { setThickness } = useContext(SnapshotsCanvasContext);

    const handleMouseUp = newValue => {
        setThickness(newValue)
    }

  return (
    <Slider
      min={0.1}
      max={1}
      step={0.1}
      initial={0.5}
      name={"thickness"}
      doSomethingOnMouseUp={handleMouseUp}
      containerStyle={{
        margin: "20px",
      }}
    />
  );
}

export default StretchFactorSlider;