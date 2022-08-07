import styled from "styled-components/macro";

export const StyledContainer1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const DeathOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: ${({ isVisible }) => isVisible ? 0.3 : 0};
  transition: opacity ${({ durationInSec, isVisible }) => {
      return (isVisible ? 0 : durationInSec)
    }}s cubic-bezier(.76,.21,.19,.76);
  background-color: red;
`;

export const StyledImgAndCanvasContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 0px;
  overflow: hidden;
  position: relative;
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
      width: 84vh;
      height: 84vh;
    `}

    ${(props) =>
      props.big &&
      !props.isVertical &&
      `
        width: 75vh;
        height: 75vh;
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
    width: 84vh;
    height: 84vh;
  `}

  ${(props) =>
    props.big &&
    !props.isVertical &&
    `
      width: 75vh;
      height: 75vh;
  `}
`;
