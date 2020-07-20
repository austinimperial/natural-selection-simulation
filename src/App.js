import React, { useContext } from "react";
import { ScreenSizesContext } from "globalState/screenSizes/index";
import SvgContainer from "components/svgContainer/index";
import Snapshots from "components/snapshots/index";
import SimulationControls from "components/simulationControls/index";
import { StyledContainer, StyledSubContainer1 } from "./AppStyles";

function App() {
  // gloabl state
  const { xxs, xs, sm, md, lg, xl } = useContext(ScreenSizesContext);

  return (
    <StyledContainer small={xxs || xs || sm} big={md || lg || xl}>
      <StyledSubContainer1 small={xxs || xs || sm} big={md || lg || xl}>
        <SimulationControls />
        <SvgContainer />
      </StyledSubContainer1>
      <Snapshots />
    </StyledContainer>
  );
}

export default App;
