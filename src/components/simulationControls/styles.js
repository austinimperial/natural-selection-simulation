import styled from "styled-components";

export const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;

  ${(props) =>
    props.big &&
    `
        align-items: flex-start;
        padding: 0px 0px 0px 10px;
    `}
`;

export const StyledSliderContainer = styled.div`
    display: flex;
    flex-direction: column;
`

export const StyledButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
`