import React from "react";
import SvgCanvas from "components/svgCanvas/index";
import FileInput from "components/fileInput/index";
import ShuffleButton from "components/shuffleButton/index";
import { StyledContainer } from "./AppStyles";

function App() {
  return (
    <StyledContainer>
      <SvgCanvas />
      <FileInput />
      <ShuffleButton />
    </StyledContainer>
  );
}

export default App;
