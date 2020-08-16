import React from 'react'
import { StyledButton } from "components/header/shared/styles"
import { Link } from 'react-router-dom'

function InfoLinkButton() {
    return (
        <Link
            to="/info"
        >
            <StyledButton
                height="30px"
                width="60px"
            >
                info
            </StyledButton>
        </Link>
    )
}

export default InfoLinkButton