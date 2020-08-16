import styled, { keyframes } from "styled-components";

export const grow = (height) => keyframes`{
    0% {height: 0px;}
    100% {height: ${height}px;}
}`;

export const StyledSvg = styled.svg`
  animation: ${(props) => grow(props.height)} ${(props) => props.growSpeed}s
    linear;
`;
