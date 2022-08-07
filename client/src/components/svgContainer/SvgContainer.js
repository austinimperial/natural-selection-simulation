import React, { useContext, useEffect, useRef, useCallback, useState } from "react";
import { ScreenSizesContext } from "globalState/screenSizes/index";
import { BugsContext } from "globalState/bugs/BugsProvider";
import { BgImageContext } from "globalState/bgImage/index";
import { SvgDimensionsContext } from "globalState/svgContainerDimensions/index";
import { SnapshotsDisplayContext } from "globalState/snapshotsDisplay/index";
import HungerTimer from "components/hunger-timer/HungerTimer";
import {
  StyledSvgCanvas,
  DeathOverlay,
  StyledBgImg,
  StyledImgAndCanvasContainer,
  StyledContainer1,
} from "./SvgContainerStyles";
import Bug from "components/bug/index";
import getContainerOffset from "./getContainerOffset";
import DomColors from "components/domColors/index";
const _ = require("lodash");

function SvgContainer() {
  const [isDead,setIsDead] = useState(false)

  const { xxs, xs, sm, md, lg, xl } = useContext(ScreenSizesContext);
  const { bugs, getLivingBugNodes, flashOnDeath } = useContext(BugsContext);
  const { bgImage } = useContext(BgImageContext);
  const { setCanvasOffset, setSvgContainerDimensions } = useContext(
    SvgDimensionsContext
  );
  const { isVertical } = useContext(SnapshotsDisplayContext);

  // refs
  const svgContainerRef = useRef();

  const handleResize = useCallback(
    _.throttle(() => {
      if (!svgContainerRef.current) return
      const newCanvasOffset = getContainerOffset(svgContainerRef);
      setCanvasOffset(newCanvasOffset);
      setSvgContainerDimensions({
        height: svgContainerRef.current.clientHeight,
        width: svgContainerRef.current.clientWidth,
      });
    }, 300),
    [svgContainerRef, setCanvasOffset, setSvgContainerDimensions]
  );

  const onDeath = () => {
    if (flashOnDeath) {
      setIsDead(true)
    }
  }

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    handleResize();
  }, [handleResize]);

  useEffect(() => {
    if (isDead) {
      setTimeout(() => {
        setIsDead(false)
      },20)
    }
  },[isDead])

  return (
    <StyledContainer1
      small={xxs || xs || sm}
      big={md || lg || xl}
    >
      <HungerTimer onDeath={onDeath} />
        <StyledImgAndCanvasContainer>
          <DeathOverlay isVisible={isDead} durationInSec={2} />
          <StyledBgImg
            src={bgImage}
            small={xxs || xs || sm}
            big={md || lg || xl}
            isVertical={isVertical}
          />
          <StyledSvgCanvas
            ref={svgContainerRef}
            small={xxs || xs || sm}
            big={md || lg || xl}
            isVertical={isVertical}
          >
            {getLivingBugNodes(bugs, true).map((bug, i) => (
              <Bug key={bug.id} i={i} bug={bug} />
            ))}
          </StyledSvgCanvas>
        </StyledImgAndCanvasContainer>
      <DomColors />
    </StyledContainer1>
  );
}

export default SvgContainer;
