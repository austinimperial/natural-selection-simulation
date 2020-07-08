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
    populationSize,
    bugSize,
    setAvgColors,
    setBugs2,
    getInitialBugs2,
    bugs2,
    getLivingBugs,
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
    const newBugs2 = getInitialBugs2(canvasDimensions, populationSize, bugSize);
    setBugs2(newBugs2)
    setAvgColors([getAverageColor(getLivingBugs(newBugs2), populationSize)]);
  }, []);

  return (
    <StyledContainer>
      <StyledBgImg src={bgImage} canvasDimensions={canvasDimensions} />
      <StyledSvgCanvas ref={svgCanvasRef} canvasDimensions={canvasDimensions}>
        {
          getLivingBugs(bugs2).map((bug, i) => (
            <Bug key={bug.id} i={i} bug={bug} />
          ))
        }
      </StyledSvgCanvas>
    </StyledContainer>
  );
}

export default SvgCanvas;