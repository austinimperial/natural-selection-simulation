import React, { useContext, useEffect, useRef, useCallback } from "react";
import { ScreenSizesContext } from 'globalState/screenSizes/index'
import { BugsContext } from "globalState/bugs/index";
import { BgImageContext } from "globalState/bgImage/index";
import { CanvasDimensionsContext } from "globalState/canvasDimensions/index";
import { 
  StyledSvgCanvas, 
  StyledContainer, 
  StyledBgImg,
  StyledImgAndCanvasContainer
} from "./styles";
import Bug from "components/bug/index";
import getCanvasOffset from "./getCanvasOffset";
import DomColors from 'components/domColors/index'
const _ = require("lodash");

function SvgCanvas() {
  // // global state
  const {xxs,xs,sm,md,lg,xl} = useContext(ScreenSizesContext)
  const {
    populationSize,
    bugSize,
    setBugs2,
    getInitialBugs2,
    bugs2,
    getLivingBugNodes,
  } = useContext(BugsContext);
  const { bgImage } = useContext(BgImageContext);
  const { canvasDimensions, setCanvasOffset } = useContext(
    CanvasDimensionsContext
  );

  // refs
  const svgCanvasRef = useRef();

  const set = useCallback(() => {
    const newCanvasOffset = getCanvasOffset(svgCanvasRef)
    setCanvasOffset(newCanvasOffset);
  },[svgCanvasRef,setCanvasOffset])

  useEffect(() => {
    set()
  },[])

  useEffect(() => {
    window.addEventListener("resize", _.throttle(set, 150));
    return () =>
      window.removeEventListener("resize", _.throttle(set, 150));
  }, []);

  useEffect(() => {
    const newBugs2 = getInitialBugs2(canvasDimensions, populationSize, bugSize);
    setBugs2(newBugs2);
  }, []);

  return (
    <StyledContainer>
      <StyledImgAndCanvasContainer
        small={xxs || xs || sm}
        big={md || lg || xl}
      >
        <StyledBgImg src={bgImage} canvasDimensions={canvasDimensions} />
        <StyledSvgCanvas ref={svgCanvasRef} canvasDimensions={canvasDimensions}>
          {getLivingBugNodes(bugs2, true).map((bug, i) => (
            <Bug key={bug.id} i={i} bug={bug} />
          ))}
        </StyledSvgCanvas>
      </StyledImgAndCanvasContainer>
      <DomColors />
    </StyledContainer>
  );
}

export default SvgCanvas;
