import React from 'react';
import Canvas from 'components/canvas/index'
import FileInput from 'components/fileInput/index'
import { StyledContainer } from './AppStyles'

function App() {

  return (
    <StyledContainer>
      <Canvas />
      <FileInput />
    </StyledContainer>
  );
}

export default App;
