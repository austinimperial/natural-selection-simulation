import React, { useState, useContext } from "react";
import {
  StyledContainer,
  StyledValueDisplay,
  StyledName,
  StyledInputAndValueContainer,
} from "./styles";
import { StyledInput } from "shared/styles";
import { BugsContext } from "globalState/bugs/index";

function PopulationSlider() {
  // global state
  const { setPopulationSize } = useContext(BugsContext);

  // local state
  const [rangeValue, setRangeValue] = useState(20);
  const [isChanging,setIsChanging] = useState(false)

  const handleMouseUp = (e) => {  
    if (isChanging) {
      setPopulationSize(e.target.value);
      setIsChanging(false)
    }
  };

  const handleOnChange = (e) => {
    setRangeValue(e.target.value);
    setIsChanging(true)
  }

  return (
    <StyledContainer>
      <StyledName>population</StyledName>
      <StyledInputAndValueContainer>
        <StyledInput
          type="Range"
          min={10}
          max={60}
          step={5}
          value={rangeValue}
          onMouseUp={handleMouseUp}
          onChange={handleOnChange}
        ></StyledInput>
        <StyledValueDisplay>{rangeValue}</StyledValueDisplay>
      </StyledInputAndValueContainer>
    </StyledContainer>
  );
}

export default PopulationSlider;
