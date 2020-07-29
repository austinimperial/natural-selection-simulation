import styled from 'styled-components'

export const StyledContainer = styled.div`
    display: flex;
    justify-content: center;
`

export const StyledSectionHeader = styled.div`
    text-align: center;
    font-family: ${props => props.theme.titleFont}, sans-serif;
    font-size: 25px;
`

export const StyledContentColumn = styled.div`
    margin: 20px 0px 0px 0px;
    padding: 10px;
    width: 100%;
    max-width: 600px;
`

export const StyledP = styled.p`
    font-family: ${props => props.theme.secondaryFont}, sans-serif;
    font-size: 16px;
`