import React, { useContext } from "react";
import { SnapshotsCanvasContext } from "globalState/snapshotsCanvas/index";
import Slider from "shared/slider/index";

function LineWidthSlider() {
  // global state
  const { setLineWidth } = useContext(SnapshotsCanvasContext);

    const handleMouseUp = newValue => {
        setLineWidth(newValue)
    }

  return (
    <Slider
      min={0.1}
      max={15}
      step={0.1}
      initial={5}
      name={"line width"}
      doSomethingOnMouseUp={handleMouseUp}
      containerStyle={{
        margin: "20px",
      }}
    />
  );
}

export default LineWidthSlider;