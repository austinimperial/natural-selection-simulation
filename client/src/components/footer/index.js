import React from 'react'
import { citation, citationDescription } from './citation'
import { Link } from 'react-router-dom'
import {
    StyledContainer,
    StyledP
} from './styles'

function Footer() {
    return (
        <StyledContainer>
            <StyledP>{citationDescription}<Link to='/info'>more info.</Link></StyledP>
            <StyledP>{citation}</StyledP>
        </StyledContainer>
    )
}

export default Footer