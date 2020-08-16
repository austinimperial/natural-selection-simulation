import styled from "styled-components";

export const StyledSwatch = styled.div`
  border-radius: 50%;
  margin: 0px 5px 0px 5px;
  height: 20px;
  width: 20px;
  background-color: ${(props) =>
    `rgb(${props.color[0]},${props.color[1]},${props.color[2]})`};
  ${(props) =>
    props.veryLight &&
    `
        margin: 0px 4px 0px 5px;
        height: 19px;
        width: 19px;
        border: 1px solid black;
    `}
`;
