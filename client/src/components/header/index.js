import React from 'react'
import { useLocation } from 'react-router-dom'
import InfoLinkButton from "components/header/infoLinkButton/index"
import HomeLinkButton from "components/header/homeLinkButton/index"
import {
    StyledContainer,
    StyledP,
} from './styles'

function Header() {
    // location
    const location = useLocation()

    return (
        <StyledContainer>
            <StyledP>Bug Hunt Camouflage</StyledP>
            { location.pathname === '/' ? <InfoLinkButton /> : <HomeLinkButton />}
        </StyledContainer>
    )
}

export default Header