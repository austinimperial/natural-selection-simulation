import React from 'react'
import { StyledButton } from "components/header/shared/styles"
import { Link } from 'react-router-dom'

function HomeLinkButton() {
    return (
        <Link
            to="/"
        >
            <StyledButton
                height="30px"
                width="75px"
            >
                back
            </StyledButton>
        </Link>
    )
} 

export default HomeLinkButton