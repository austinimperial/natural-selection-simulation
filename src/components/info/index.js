import React, { useContext } from 'react'
import { ScreenSizesContext } from 'globalState/screenSizes/index'
import { howToUseIt, prerequisites,relating, history, photoCredits } from './text'
import { 
    StyledContainer, 
    StyledSectionHeader,
    StyledP,
    StyledContentColumn
 } from './styles'

function Info() {
    // global state
    const { xxs, xs, sm, md, lg, xl } = useContext(ScreenSizesContext)

    return (
        <StyledContainer>
            <StyledContentColumn
                small={xxs || xs || sm}
                big={md || lg || xl}
            >
                <StyledSectionHeader>How to use it</StyledSectionHeader>
                <StyledP>{howToUseIt}</StyledP>
                <StyledSectionHeader>Relating the simulation to the real world</StyledSectionHeader>
                <StyledP>{prerequisites}</StyledP>
                <StyledP>{relating}</StyledP>
                <StyledSectionHeader>History</StyledSectionHeader>
                <StyledP>{history}</StyledP>
                <StyledSectionHeader>Photo credits</StyledSectionHeader>
                <StyledP>{photoCredits}</StyledP>
            </StyledContentColumn>
        </StyledContainer>
    )
}

export default Info