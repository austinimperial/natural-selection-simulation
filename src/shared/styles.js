import styled from "styled-components";

export const StyledInput = styled.input`
    border: 1px solid black;
    appearance: none;
    box-sizing: border-box;
    border-radius: 20px;
    overflow: hidden;

    // webkit
    :focus { outline: none; }
    ::-webkit-slider-runnable-track {}
    ::-webkit-slider-thumb {
        box-shadow: 0px 0px 0px #000000;
        height: 18px;
        width: 10px;
        border-radius: 0px;
        background: black;
        cursor: pointer;
        -webkit-appearance: none;
    }

    :focus::-webkit-slider-thumb { background-color: red; }

    // moz
    ::-moz-focus-outer {
        border: none;
    }
    ::-moz-range-track {

    }
    ::-moz-range-thumb {
        box-shadow: 0px 0px 0px #000000;
        height: 18px;
        width: 10px;
        border-radius: 0px;
        background: black;
        cursor: pointer;
        -moz-appearance: none;
        border: none;
    }
    :focus::-moz-range-thumb {
        background: red;
    }

    // ms
    ::-ms-track {

    }
    ::-ms-thumb {
        box-shadow: 0px 0px 0px #000000;
        height: 18px;
        width: 10px;
        border-radius: 0px;
        background: black;
        cursor: pointer;
        -ms-appearance: none;
    }
    :focus::-ms-thumb {
        background-red;
    }
`;
