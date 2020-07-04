import React, { useContext, useEffect, useRef } from "react";
//import { ScreenSizesContext } from 'globalState/screenSizes/index'
import { BugsContext } from "globalState/bugs/index";
import { BgImageContext } from "globalState/bgImage/index";
import { CanvasDimensionsContext } from "globalState/canvasDimensions/index";
import { StyledSvgCanvas, StyledContainer, StyledBgImg } from "./styles";
import Bug from "components/bug/index";
import getCanvasOffset from "./getCanvasOffset";
const _ = require("lodash");

function SvgCanvas() {
  // // global state
  // const {xxs,xs,sm,md,lg,xl} = useContext(ScreenSizesContext)
  const { bugs, getInitialBugs, populationSize, setBugs, bugSize } = useContext(
    BugsContext
  );
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
    getInitialBugs(canvasDimensions, populationSize, setBugs, bugSize);
  }, []);

  return (
    <StyledContainer>
      <StyledBgImg src={bgImage} canvasDimensions={canvasDimensions} />
      <StyledSvgCanvas ref={svgCanvasRef} canvasDimensions={canvasDimensions}>
        {bugs.slice(0, populationSize).map((bug, i) => (
          <Bug key={`${bug.x}${bug.y}${bug.color}`} i={i} bug={bug} />
        ))}
      </StyledSvgCanvas>
    </StyledContainer>
  );
}

export default SvgCanvas;
