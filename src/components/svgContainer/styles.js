import styled from "styled-components";

export const StyledContainer1 = styled.div`
  padding: 10px 0px 0px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StyledContainer2 = styled.div`
  position: relative;
`;

export const StyledImgAndCanvasContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 0px;
  overflow: hidden;
`;

export const StyledSvgCanvas = styled.div`
  outline: none;
  overflow: hidden;
  position: relative;

  height: 500px;
  width: 500px;

  ${(props) =>
    props.small &&
    props.isVertical &&
    `
    width: 100vw;
    height: 100vw;
  `}

  ${(props) =>
    props.small &&
    !props.isVertical &&
    `
      width: 97vh;
      height: 97vh;
    `}
`;

export const StyledBgImg = styled.img`
  outline: none;
  border: none;
  position: absolute;
  z-index: -1;

  height: 500px;
  width: 500px;

  ${(props) =>
    props.small &&
    props.isVertical &&
    `
    width: 100vw;
    height: 100vw;
  `}

  ${(props) =>
    props.small &&
    !props.isVertical &&
    `
    width: 97vh;
    height: 97vh;
  `}
`;
