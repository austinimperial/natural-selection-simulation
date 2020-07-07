import React, { useContext, useEffect, useRef } from "react";
//import { ScreenSizesContext } from 'globalState/screenSizes/index'
import { BugsContext } from "globalState/bugs/index";
import { BgImageContext } from "globalState/bgImage/index";
import { CanvasDimensionsContext } from "globalState/canvasDimensions/index";
import { StyledSvgCanvas, StyledContainer, StyledBgImg } from "./styles";
import Bug from "components/bug/index";
import getCanvasOffset from "./getCanvasOffset";
import getAverageColor from "globalState/bugs/getAverageColor";
const _ = require("lodash");

function SvgCanvas() {
  // // global state
  // const {xxs,xs,sm,md,lg,xl} = useContext(ScreenSizesContext)
  const {
    bugs,
    getInitialBugs,
    populationSize,
    setBugs,
    bugSize,
    setAvgColors,
    setBugs2,
    getInitialBugs2
  } = useContext(BugsContext);
  const { bgImage } = useContext(BgImageContext);
  const { canvasDimensions, setCanvasOffset } = useContext(
    CanvasDimensionsContext
  );

  // refs
  const svgCanvasRef = useRef();

  useEffect(() => {
    setCanvasOffset(getCanvasOffset(svgCanvasRef));
    const resetCanvasOffset = () =>
      setCanvasOffset(getCanvasOffset(svgCanvasRef));
    window.addEventListener("resize", _.throttle(resetCanvasOffset, 200));
    return () =>
      window.removeEventListener("resize", _.throttle(resetCanvasOffset, 200));
  }, []);

  useEffect(() => {
    const newBugs = getInitialBugs(canvasDimensions, populationSize, bugSize);
    setBugs(newBugs);
    setAvgColors([getAverageColor(newBugs, populationSize)]);

    // bugs2
    const newBugs2 = getInitialBugs2(canvasDimensions, populationSize, bugSize);
    setBugs2(newBugs2)
  }, []);

  return (
    <StyledContainer>
      <StyledBgImg src={bgImage} canvasDimensions={canvasDimensions} />
      <StyledSvgCanvas ref={svgCanvasRef} canvasDimensions={canvasDimensions}>
        {bugs.slice(0, populationSize).map((bug, i) => (
          <Bug key={bug.id} i={i} bug={bug} />
        ))}
      </StyledSvgCanvas>
    </StyledContainer>
  );

  // bugs2
}

export default SvgCanvas;
