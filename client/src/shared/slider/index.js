import React, { useState } from "react";
import {
  StyledContainer,
  StyledValueDisplay,
  StyledName,
  StyledInputAndValueContainer,
  StyledInput
} from "./styles";

function Slider({
  min,
  max,
  initial,
  step,
  name,
  unit,
  sliderWidth,
  containerStyle,
  doSomethingOnMouseUp,
  doSomethingOnChange,
}) {
  // local state
  const [rangeValue, setRangeValue] = useState(initial);
  const [isChanging, setIsChanging] = useState(false);

  const handleMouseUp = (e) => {
    if (isChanging && doSomethingOnChange === undefined) {
      doSomethingOnMouseUp(e.target.value);
    }
    setIsChanging(false);
  };

  const handleOnChange = (e) => {
    setRangeValue(e.target.value);
    setIsChanging(true);
    if (doSomethingOnChange !== undefined) doSomethingOnChange(e.target.value);
  };

  return (
    <StyledContainer style={containerStyle}>
      <StyledName>{name}</StyledName>
      <StyledInputAndValueContainer>
        <StyledInput
          type="Range"
          min={min}
          max={max}
          step={step}
          value={rangeValue}
          onMouseUp={handleMouseUp}
          onTouchEnd={handleMouseUp}
          onChange={handleOnChange}
          sliderWidth={sliderWidth}
        ></StyledInput>
        <StyledValueDisplay>
          {rangeValue}
          {unit}
        </StyledValueDisplay>
      </StyledInputAndValueContainer>
    </StyledContainer>
  );
}

export default Slider;
