import styled from "styled-components";

export const StyledContainer = styled.div`

`

export const StyledImgAndCanvasContainer = styled.div`
  border: 1px solid red;
  display: flex;
  justify-content: center;
  padding: 20px 0px 0px 0px;
`;
export const StyledSvgCanvas = styled.div`
  border: 1px solid black;
  outline: none;
  height: ${(props) => props.canvasDimensions.height}px;
  width: ${(props) => props.canvasDimensions.width}px;
`;

export const StyledBgImg = styled.img`
  outline: none;
  border: none;
  position: absolute;
  height: ${(props) => props.canvasDimensions.height}px;
  width: ${(props) => props.canvasDimensions.width}px;
  z-index: -1;
`;
