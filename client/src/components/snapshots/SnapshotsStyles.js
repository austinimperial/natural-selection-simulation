import styled from "styled-components/macro";

export const StyledContainer = styled.div`
    margin-top: 20px;
`;

export const StyledP = styled.p`
    margin: 0px;
    font-size: 34px;
    font-family: 'Barrio', cursive;
`

export const StyledTitleContainer = styled.div`
    display: flex;
    justify-content: center;
`

export const StyledScrollBox = styled.div`
  display: flex;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  overflow: scroll;
  overflow-x: scroll;
  align-items: center;
  justify-content: center;
  margin: ${({ isVertical }) => isVertical ? '0px' : '0vh 0vh 25vh 0vh'};
  flex-direction: ${({ isVertical }) => isVertical ? 'row-reverse' : 'column'};
`;

export const DeathsContainer = styled.div`
  display: flex;
  position: relative;
  width: ${({ isVertical, width, containerSize }) => isVertical ? `${containerSize}px` : `${width}px`};
  height: ${({ isVertical, height, containerSize }) => isVertical ? `${height}px` : `${containerSize}px`};
  overflow: hidden;
  `
