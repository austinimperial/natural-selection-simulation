import React, { useState, useContext, useEffect } from "react";
import example from "./example.js";
import { colorListRegExp }  from "./regExp";
import { getArrayFromText } from './getArrayFromText'
import { BugsContext } from "globalState/bugs/BugsProvider";
import { SvgDimensionsContext } from "globalState/svgContainerDimensions/index"
import { SnapshotsDisplayContext } from "globalState/snapshotsDisplay/SnapshotDisplay"
import { ScreenSizesContext } from "globalState/screenSizes/index"
import {
  StyledContainer,
  StyledTextArea,
  StyledP,
  StyledButton,
} from "./styles";

function CustomInitialBugs() {
  // global state
  const { 
    setBugs,
    bugSize, 
    getCustomInitialBugs, 
    setPopulationSize,
    setPopulationSnapshots,
    setStepCount,
  } = useContext(BugsContext);
  const { svgContainerDimensions } = useContext(SvgDimensionsContext)
  const { resetCanvasDimens } = useContext(SnapshotsDisplayContext);
  const {xxs, xs, sm, md, lg, xl} = useContext(ScreenSizesContext)

  // local state
  const [isInvalid, setIsInvalid] = useState(false);
  const [text, setText] = useState("");

  // screen sizes
  const small = (xxs || xs || sm)
  const big = (md || lg || xl)

  useEffect(() => {
    if (text.match(colorListRegExp) || text === '') {
        return setIsInvalid(false);
    }
    setIsInvalid(true)
  }, [text]);

  const handleOnClick = () => {
    if (!isInvalid) {
        const customColorArray = getArrayFromText(text)
        const customBugs = getCustomInitialBugs(svgContainerDimensions,bugSize,customColorArray)
        setPopulationSize(customColorArray.length)
        setBugs(customBugs);
        setPopulationSnapshots([]);
        setStepCount(0);
        resetCanvasDimens();
    }
  };
    return (
      <StyledContainer
        small={small}
        big={big}
      >
        { big && <StyledP>custom initial bugs</StyledP> }
        <StyledTextArea
          small={small}
          big={big}
          isInvalid={isInvalid}
          type="textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></StyledTextArea>
        <StyledP subtext >{example}</StyledP>
        <div>
          <StyledButton isInvalid={isInvalid} onClick={handleOnClick}>
            set initial bugs
          </StyledButton>
        </div>
      </StyledContainer>
    );    
}

export default CustomInitialBugs;
