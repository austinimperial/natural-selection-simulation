import styled from "styled-components";

export const StyledContainer = styled.div`
  position: relative;
`

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

  ${props => props.small && `
    width: 100vw;
    height: 100vh;
  `}

  ${props => props.big && `
    height: 500px;
    width: 500px;
  `}
`;

export const StyledBgImg = styled.img`

  ${props => props.small && `
    width: 100vw;
    height: 100vh;
  `}

  ${props => props.big && `
    height: 500px;
    width: 500px;
  `}

  outline: none;
  border: none;
  position: absolute;
  z-index: -1;
`;