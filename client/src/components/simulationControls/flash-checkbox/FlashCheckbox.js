import React, { useContext } from 'react'
import { Container } from './FlashCheckboxStyles'
import CheckBox from 'shared/check-box/CheckBox'
import { BugsContext } from 'globalState/bugs/BugsProvider'

const FlashCheckbox = () => {
    const { setFlashOnDeath, flashOnDeath } = useContext(BugsContext)
    return (
        <Container>
            <CheckBox 
            isChecked={flashOnDeath} 
            onChange={() => setFlashOnDeath(prev => !prev)}
            label={'flash on death'}
        />            
        </Container>
    )
}

export default FlashCheckbox