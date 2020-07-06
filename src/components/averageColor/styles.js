import styled from "styled-components";

export const StyledContainer = styled.div.attrs((props) => ({
  style: {
    background: `linear-gradient(180deg, ${props.gradientString})`,
    backgroundColor: props.gradientString,
  },
}))`
    flex-grow: 1;
    margin: 20px;
    display: flex;
    flex-direction: column;
}
`;
