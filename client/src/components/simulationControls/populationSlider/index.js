import React, { useContext, useCallback } from "react";
import { BugsContext } from "globalState/bugs/index";
import { SvgDimensionsContext } from "globalState/svgContainerDimensions/index";
import Slider from "shared/slider/index";
import { StyledContainer } from './styles'

function PopulationSlider() {
  // global state
  const {
    populationSize,
    setPopulationSize,
    bugSize,
    setPopulationSnapshots,
    setBugs,
    getInitialBugs,
    setStepCount,
  } = useContext(BugsContext);
  const { svgContainerDimensions } = useContext(SvgDimensionsContext);

  const handleMouseUp = useCallback(
    (newValue) => {
      const newbugs = getInitialBugs(svgContainerDimensions, newValue, bugSize);
      setBugs(newbugs);
      setPopulationSize(newValue);
      setPopulationSnapshots([]);
      setStepCount(0);
    },
    [
      svgContainerDimensions,
      bugSize,
      setPopulationSize,
      setPopulationSnapshots,
      setBugs,
      getInitialBugs,
      setStepCount,
    ]
  );

  return (
    <StyledContainer>
      <Slider
        min={10}
        max={80}
        step={1}
        initial={populationSize}
        name={"population"}
        doSomethingOnMouseUp={handleMouseUp}
        sliderWidth={"150px"}
        containerStyle={{
          width: "200px",
        }}
      />
    </StyledContainer>
  );
}

export default PopulationSlider;
