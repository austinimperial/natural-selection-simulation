import styled from "styled-components";

export const StyledFileInput = styled.input`
  cursor: pointer;
  filter: alpha(opacity=0);
  opacity: 0;
  right: 0;
  text-align: right;
  top: 0;
  height: 1px;
  width: 1px;
`;

export const StyledLabel = styled.label`
  overflow: hidden;
  border: 1px solid black;
  background-color: white;
  margin: 10px 0px 0px 0px;
  width: 95px;
  padding: 0px 0px 0px 5px;
  height: 20px;
  font-family: ${props => props.theme.secondaryFont};
  font-size: 12px;
  cursor: pointer;
  -webkit-appearance: none;
`
