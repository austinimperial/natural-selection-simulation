import React, { useContext, useEffect, useState } from "react";
import { BgImageContext } from "globalState/bgImage/index";
import { SvgDimensionsContext } from "globalState/svgContainerDimensions/index";
import computeImgPalette from "./computeImgPalette";
import uuid from "react-uuid";
import { StyledSwatch } from "./styles";
import {
  StyledSwatchContainer,
  StyledTitle,
  StyledContainer,
} from "../shared/styles";

function DomImageColors({ maxColorCount }) {
  // local state
  const [palette, setPalette] = useState(
    Array(maxColorCount).fill([255, 255, 255])
  );

  // global state
  const { bgImage } = useContext(BgImageContext);
  const { svgContainerDimensions } = useContext(SvgDimensionsContext);

  useEffect(() => {
    computeImgPalette(
      bgImage,
      svgContainerDimensions.width,
      svgContainerDimensions.height,
      maxColorCount,
      setPalette
    );
  }, [bgImage, svgContainerDimensions, maxColorCount]);

  return (
    <StyledContainer>
      <StyledTitle>dominant colors in image</StyledTitle>
      <StyledSwatchContainer>
        {palette.map((color) => (
          <StyledSwatch
            key={uuid()}
            color={color}
            veryLight={color[0] > 240 && color[1] > 240 && color[2] > 240}
          ></StyledSwatch>
        ))}
      </StyledSwatchContainer>
    </StyledContainer>
  );
}

export default DomImageColors;
