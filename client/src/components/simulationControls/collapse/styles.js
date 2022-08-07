import styled from 'styled-components/macro'

export const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;

    max-height: ${props => props.height}px;
    transition: max-height 0.3s ease-in-out, margin-bottom 0.3s cubic-bezier(0,1.62,1,.68);    

    ${props => props.isCollapsed && `
        max-height: 0px;
        margin-bottom: 0px;
        transition: max-height 0.3s ease-in-out, margin-bottom 0.3s cubic-bezier(1,-0.13,1,-0.36);
    `}
`