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
    bugs2,
    getLivingBugNodes,
  } = useContext(BugsContext);
  const { bgImage } = useContext(BgImageContext);
  const { setCanvasOffset, setCanvasDimensions } = useContext(
    CanvasDimensionsContext
  );

  // refs
  const svgCanvasRef = useRef();

  const handleResize = useCallback(() => {
    const newCanvasOffset = getCanvasOffset(svgCanvasRef)
    setCanvasOffset(newCanvasOffset);
    setCanvasDimensions({
      height: svgCanvasRef.current.clientHeight,
      width: svgCanvasRef.current.clientWidth
    })
  },[svgCanvasRef,setCanvasOffset,setCanvasDimensions])

  useEffect(() => {
    window.addEventListener("resize", _.throttle(handleResize, 150));
    return () =>
      window.removeEventListener("resize", _.throttle(handleResize, 150));
  }, []);

  useEffect(() => {
    handleResize()
  },[handleResize])

  return (
    <StyledContainer>
      <StyledImgAndCanvasContainer>
        <StyledBgImg 
          src={bgImage} 
          small={xxs || xs || sm}
          big={md || lg || xl}
        />
        <StyledSvgCanvas 
          ref={svgCanvasRef}
          small={xxs || xs || sm}
          big={md || lg || xl}
        >
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