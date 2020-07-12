import React, { useContext, useState, useCallback } from "react";
import { BugsContext } from "globalState/bugs/index";
import { StyledContainer, StyledButton, StyledSelect } from "./styles";

function RandomStep() {
  // local state
  const [stepInput, setStepInput] = useState(1);

  // global state
  const {
    bugs2,
    getRandomLivingBugNode,
    step,
    stepCount,
    MAX_STEP_COUNT,
  } = useContext(BugsContext);

  const handleOnClick = useCallback(() => {
    if (parseInt(stepInput) + parseInt(stepCount) > MAX_STEP_COUNT)
      return alert("this will exceed max steps allowed");

    for (let i = 0; i < stepInput; i++) {
      const randomLivingBugNode = getRandomLivingBugNode(bugs2).data;
      step(randomLivingBugNode);
    }
  }, [
    bugs2,
    getRandomLivingBugNode,
    step,
    stepInput,
    MAX_STEP_COUNT,
    stepCount,
  ]);

  return (
    <StyledContainer>
      <StyledButton onClick={handleOnClick}>random step</StyledButton>
      <StyledSelect
        value={stepInput}
        onChange={(e) => setStepInput(e.target.value)}
      >
        <option value={1}>1</option>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
        <option value={250}>250</option>
        <option value={500}>500</option>
      </StyledSelect>
    </StyledContainer>
  );
}

export default RandomStep;
