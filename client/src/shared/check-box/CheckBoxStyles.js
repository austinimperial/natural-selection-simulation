import styled from 'styled-components';
import convert from 'color-convert'

const getCheckMarkSvgString = (hex) => {
  const rgb = `rgb(${convert.hex.rgb(hex)})`
  return `'data:image/svg+xml,<svg viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="${rgb}" d="M10.6876 0.804268C10.3053 0.408357 9.67439 0.397378 9.27847 0.779742C9.27018 0.787742 9.26201 0.795917 9.25395 0.804268L3.96389 6.09439L1.68893 3.81943C1.29302 3.43707 0.662129 3.44804 0.279765 3.84395C-0.0932551 4.23017 -0.0932551 4.84243 0.279765 5.22865L3.25931 8.20819C3.6485 8.59727 4.27933 8.59727 4.66847 8.20819L10.6631 2.21349C11.059 1.83107 11.07 1.20018 10.6876 0.804268Z"/></svg>'`;
};

export const Container = styled.label`
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  margin-right: 10px;
  position: relative;
  user-select: none;

  input {
    cursor: pointer;
    height: 0;
    opacity: 0;
    position: absolute;
    width: 0;
  }

  :hover input ~ .checkmark {
    background-color: #ccc;
  }

  .result-check-mark {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border: 1px solid black;
    height: 20px;
    left: 0;
    overflow: hidden;
    position: relative;
    top: 0;
    width: 20px;
    border-radius: 4px;

    :after {
      content: '';
      position: relative;
      display: none;
    }
  }

  input:checked ~ .result-check-mark:after {
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-image: url(${() => getCheckMarkSvgString("#050505")});
    display: block;
    height: 80%;
    position: relative;
    width: 80%;
  }
`;

export const CheckInput = styled.input.attrs(() => ({
  type: 'checkbox',
}))``;

export const Name = styled.div`
    font-family: ${props => props.theme.secondaryFont}, sans-serif;
    font-size: 14px;
    margin-right: 5px;
`;