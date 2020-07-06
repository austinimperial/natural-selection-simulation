import React, { useContext, useEffect, useState } from "react";
import { BgImageContext } from "globalState/bgImage/index";
import { CanvasDimensionsContext } from "globalState/canvasDimensions/index";
import computeImgPalette from "./computeImgPalette";
import uuid from "react-uuid";
import { StyledContainer, StyledSwatch } from "./styles";

function DomImageColors({ maxColorCount }) {
  // local state
  const [palette, setPalette] = useState(
    Array(maxColorCount).fill([255, 255, 255])
  );

  // global state
  const { bgImage } = useContext(BgImageContext);
  const { canvasDimensions } = useContext(CanvasDimensionsContext);

  useEffect(() => {
    computeImgPalette(
      bgImage,
      canvasDimensions.width,
      canvasDimensions.height,
      maxColorCount,
      setPalette
    );
  }, [bgImage, canvasDimensions, maxColorCount]);

  return (
    <StyledContainer>
      dominant colors in image:
      {palette.map((color) => (
        <StyledSwatch
          key={uuid()}
          color={color}
          veryLight={color[0] > 240 && color[1] > 240 && color[2] > 240}
        ></StyledSwatch>
      ))}
    </StyledContainer>
  );
}

export default DomImageColors;
