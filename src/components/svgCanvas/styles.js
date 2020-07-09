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
  ${props => props.small && `
    width: 100vw;
    height: 100vw;
  `}

  ${props => props.big && `
    height: 500px;
    width: 500px;
  `}
  border: 1px solid black;
  outline: none;
`;

export const StyledBgImg = styled.img`

  ${props => props.small && `
    width: 100vw;
    height: 100vw;
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