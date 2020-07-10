import React, { useContext, useEffect, useRef, useCallback } from "react";
import { ScreenSizesContext } from 'globalState/screenSizes/index'
import { BugsContext } from "globalState/bugs/index";
import { BgImageContext } from "globalState/bgImage/index";
import { SvgDimensionsContext } from "globalState/svgContainerDimensions/index";
import { 
  StyledSvgCanvas, 
  StyledContainer, 
  StyledBgImg,
  StyledImgAndCanvasContainer
} from "./styles";
import Bug from "components/bug/index";
import getContainerOffset from "./getContainerOffset";
import DomColors from 'components/domColors/index'
const _ = require("lodash");

function SvgContainer() {
  // // global state
  const {xxs,xs,sm,md,lg,xl} = useContext(ScreenSizesContext)
  const { bugs2, getLivingBugNodes } = useContext(BugsContext);
  const { bgImage } = useContext(BgImageContext);
  const { setCanvasOffset, setSvgContainerDimensions } = useContext(SvgDimensionsContext);

  // refs
  const svgContainerRef = useRef();

  const handleResize = useCallback(_.throttle(() => {
    const newCanvasOffset = getContainerOffset(svgContainerRef)
    setCanvasOffset(newCanvasOffset);
    setSvgContainerDimensions({
      height: svgContainerRef.current.clientHeight,
      width: svgContainerRef.current.clientWidth
    })
  },300),[svgContainerRef,setCanvasOffset,setSvgContainerDimensions])

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => 
      window.removeEventListener("resize", handleResize);
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
          ref={svgContainerRef}
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

export default SvgContainer;