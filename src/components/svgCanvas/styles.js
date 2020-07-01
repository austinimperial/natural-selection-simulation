import styled from "styled-components";

export const StyledContainer = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
`;
export const StyledSvgCanvas = styled.div`
  height: ${(props) => props.canvasDimensions.height}px;
  width: ${(props) => props.canvasDimensions.width}px;
  border: 1px solid red;
`;

export const StyledBgImg = styled.img`
  border: 1px solid black;
  position: absolute;
  height: ${(props) => props.canvasDimensions.height}px;
  width: ${(props) => props.canvasDimensions.width}px;
  z-index: -1;
`;
