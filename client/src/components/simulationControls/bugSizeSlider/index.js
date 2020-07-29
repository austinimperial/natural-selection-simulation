import React, { useContext } from "react";
import { BugsContext } from "globalState/bugs/index";
import Slider from "shared/slider/index";
import { StyledContainer } from './styles'

function BugSizeSlider() {
  // global state
  const { setBugSize, bugSize } = useContext(BugsContext);

  return (
    <StyledContainer>
      <Slider
        min={4}
        max={70}
        step={2}
        initial={bugSize}
        name={"bug size"}
        unit={"px"}
        doSomethingOnChange={setBugSize}
        sliderWidth={"150px"}
        containerStyle={{
          width: "200px",
        }}
      />
    </StyledContainer>
  );
}

export default BugSizeSlider;
