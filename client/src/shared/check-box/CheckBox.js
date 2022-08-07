import React from 'react' 
import { Container, CheckInput, Name } from './CheckBoxStyles'

const CheckBox = ({
    value,
    onChange,
    isChecked,
    label
}) => {
    return (
        <Container>
            <Name>{label}</Name>
            <CheckInput
                value={value}
                onChange={onChange}
                checked={isChecked}
            />
            <div className="result-check-mark" />
        </Container>
    )
}

export default CheckBox