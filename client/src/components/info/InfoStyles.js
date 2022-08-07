import styled from 'styled-components/macro'

export const StyledContainer = styled.div`
    display: flex;
    justify-content: center;
    p {
        margin-bottom: 10px;
    }
`

export const StyledSectionHeader = styled.div`
    text-align: center;
    font-family: ${props => props.theme.secondaryFont}, sans-serif;
    font-size: 25px;
    margin-top: 10px;
`

export const Bold = styled.span`
    font-weight: bold;
`

export const StyledContentColumn = styled.div`
    margin: 20px 0px 0px 0px;
    padding: 10px;
    width: 100%;
    max-width: 780px;
`

export const StyledP = styled.p`
    font-family: ${props => props.theme.secondaryFont}, sans-serif;
    font-size: 16px;
`

export const Ul = styled.ul`

`

export const Ol = styled.ol`

`


export const Li = styled.li`

`