import React, { useContext, useEffect, useRef, useCallback } from "react";
import { ScreenSizesContext } from "globalState/screenSizes/index";
import { BugsContext } from "globalState/bugs/index";
import { BgImageContext } from "globalState/bgImage/index";
import { SvgDimensionsContext } from "globalState/svgContainerDimensions/index";
import { SnapshotsDisplayContext } from "globalState/snapshotsDisplay/index";
import {
  StyledSvgCanvas,
  StyledContainer2,
  StyledBgImg,
  StyledImgAndCanvasContainer,
  StyledContainer1,
} from "./styles";
import Bug from "components/bug/index";
import getContainerOffset from "./getContainerOffset";
import DomColors from "components/domColors/index";
const _ = require("lodash");

function SvgContainer() {
  // // global state
  const { xxs, xs, sm } = useContext(ScreenSizesContext);
  const { bugs, getLivingBugNodes } = useContext(BugsContext);
  const { bgImage } = useContext(BgImageContext);
  const { setCanvasOffset, setSvgContainerDimensions } = useContext(
    SvgDimensionsContext
  );
  const { isVertical } = useContext(SnapshotsDisplayContext);

  // refs
  const svgContainerRef = useRef();

  const handleResize = useCallback(
    _.throttle(() => {
      const newCanvasOffset = getContainerOffset(svgContainerRef);
      setCanvasOffset(newCanvasOffset);
      setSvgContainerDimensions({
        height: svgContainerRef.current.clientHeight,
        width: svgContainerRef.current.clientWidth,
      });
    }, 300),
    [svgContainerRef, setCanvasOffset, setSvgContainerDimensions]
  );

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    handleResize();
  }, [handleResize]);

  return (
    <StyledContainer1>
      <StyledContainer2>
        <StyledImgAndCanvasContainer>
          <StyledBgImg
            src={bgImage}
            small={xxs || xs || sm}
            isVertical={isVertical}
          />
          <StyledSvgCanvas
            ref={svgContainerRef}
            small={xxs || xs || sm}
            isVertical={isVertical}
          >
            {getLivingBugNodes(bugs, true).map((bug, i) => (
              <Bug key={bug.id} i={i} bug={bug} />
            ))}
          </StyledSvgCanvas>
        </StyledImgAndCanvasContainer>
      </StyledContainer2>
      <DomColors />
    </StyledContainer1>
  );
}

export default SvgContainer;
