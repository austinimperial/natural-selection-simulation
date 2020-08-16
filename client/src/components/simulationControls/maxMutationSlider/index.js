import React, { useContext } from "react";
import { BugsContext } from "globalState/bugs/index";
import Slider from "shared/slider/index";
import { StyledContainer } from './styles'

function GrowSpeedSlider() {
  // global state
  const { maxMutationStep, setMaxMutationStep } = useContext(BugsContext);

  return (
    <StyledContainer>
      <Slider
        min={0}
        max={255}
        step={3}
        initial={maxMutationStep}
        name={"max mutation step"}
        doSomethingOnMouseUp={setMaxMutationStep}
        sliderWidth={"150px"}
        containerStyle={{
          width: "200px",
        }}
      />
    </StyledContainer>
  );
}

export default GrowSpeedSlider;
