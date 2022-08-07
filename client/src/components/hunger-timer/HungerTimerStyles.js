import styled from "styled-components/macro";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 20px;

  @media only screen and (max-width: ${({ theme }) => theme.md}px) {
    margin-top: 10px;
  }
`;

export const ValueDisplay = styled.div`
  margin: 0px 0px 0px 5px;
  font-family: ${(props) => props.theme.secondaryFont}, sans-serif;
  font-size: 14px;
`;

export const Name = styled.div`
  font-family: ${(props) => props.theme.secondaryFont}, sans-serif;
  font-size: 14px;

  @media only screen and (max-width: ${({ theme }) => theme.md}px) {
    margin-left: 5px;
  }
`;

export const Percent = styled.div`
  width: ${({ percent }) => `${percent * 100}%`};
  background-color: black;
  height: 100%;
  transition: width
    ${({ durationInSec, percent }) => {
      return percent === 0 ? durationInSec : 0;
    }}s
    linear;
`;

export const Bar = styled.div`
  height: 20px;
  width: 100%;
  border: 1px solid black;
  background-color: white;
  appearance: none;
  box-sizing: border-box;
  border-radius: 20px;
  overflow: hidden;

  @media only screen and (max-width: ${({ theme }) => theme.md}px) {
    border-radius: 0px;
    border-left: none;
    border-right: none;
  }
`;
