import styled from "styled-components";
import { downArrowSvgString } from 'shared/downArrow'

export const StyledContainer = styled.div`
  margin: 10px 0px 0px 0px;
`;

export const StyledSelect = styled.select`
  font-family: ${props => props.theme.secondaryFont};
  margin: 0px;
  appearance: none;
  font-size: 12px;
  border-radius: 0px 0px 0px 0px;
  border: 1px solid black;
  background-color: white;
  padding: 0px 0px 0px 5px;
  outline: none;
  width: 55px;
  height: 20px;
  cursor: pointer;

  background-image: url('data:image/svg+xml;,${downArrowSvgString}');
  background-repeat: no-repeat;
  background-size: 5px;
  background-position: right 4px bottom 4px;
`;

export const StyledP = styled.p`
  font-family: ${props => props.theme.secondaryFont};
  font-size: 12px;
  margin: 0px;
`;
