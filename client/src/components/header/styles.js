import styled from 'styled-components/macro'

export const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
`


export const StyledP = styled.p`
    text-align: center;
    margin: 10px 10px 0px 10px;
    font-size: 50px;
    font-family: ${props => props.theme.titleFont}, sans-serif;
`

export const Subheader = styled.p`
    text-align: center;
    font-size: 20px;
    font-family: ${props => props.theme.secondaryFont}, sans-serif;
`