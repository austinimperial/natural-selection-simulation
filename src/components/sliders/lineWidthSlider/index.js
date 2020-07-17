import React, { useContext } from "react";
import { SnapshotsDisplayContext } from "globalState/snapshotsDisplay/index";
import Slider from "shared/slider/index";

function LineWidthSlider() {
  // global state
  const { setLineWidth } = useContext(SnapshotsDisplayContext);

  const handleMouseUp = (newValue) => {
    setLineWidth(newValue);
  };

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
