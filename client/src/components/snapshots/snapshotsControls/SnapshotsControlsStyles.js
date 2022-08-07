import styled from "styled-components/macro";

export const Container = styled.div`
  background-color: #8fbfa7;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${({ isVertical }) => isVertical ? '0px' : '10px'};

  ${props => props.small && `
    justify-content: center;
  `}

  ${props => props.big && `
    justify-content: flex-start;
  `}
`;


export const StyledSliderContainer = styled.div`
  display: flex;
  margin: 0px 0px 20px 0px;

  ${props => props.small && `
    flex-direction: column;
    align-items: flex-start;
  `}

  ${props => props.big && `
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  `}
`