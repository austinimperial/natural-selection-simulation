import React, { useContext } from "react";
import { SnapshotsDisplayContext } from "globalState/snapshotsDisplay/index";
import Slider from "shared/slider/index";

function LineWidthSlider() {
  // global state
  const { lineWidth, setLineWidth } = useContext(SnapshotsDisplayContext);

  const handleMouseUp = (newValue) => {
    setLineWidth(newValue);
  };

  return (
    <Slider
      min={0.1}
      max={15}
      step={0.1}
      initial={lineWidth}
      name={"line width"}
      doSomethingOnMouseUp={handleMouseUp}
      sliderWidth="150px"
      containerStyle={{
        width: "200px",
      }}
    />
  );
}

export default LineWidthSlider;
