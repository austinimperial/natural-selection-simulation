import styled from "styled-components";
import { downArrowSvgString } from 'shared/downArrow'

export const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0px 0px 0px;
    
  ${props => props.small && `
    margin: 15px;
  `}
`;

export const StyledButton = styled.button`
  margin: 0px;
  height: 20px;
  appearance: none;
  border: 1px solid black;
  background-color: white;
  font-family: ${props => props.theme.secondaryFont};
  font-size: 12px;
  cursor: pointer;
`;

export const StyledSelect = styled.select`
  cursor: pointer;
  margin: 0px;
  outline: none;
  padding: 0px 0px 0px 5px;
  appearance: none;
  height: 20px;
  width: 43px;
  border: 1px solid black;
  border-left: none;
  outline: none;
  font-family: ${props => props.theme.secondaryFont};
  font-size: 12px;
  border-radius: 0px 20px 20px 0px;
  background-image: url('data:image/svg+xml;,${downArrowSvgString}');
  background-repeat: no-repeat;
  background-size: 5px;
  background-position: right 4px bottom 4px;
`;
