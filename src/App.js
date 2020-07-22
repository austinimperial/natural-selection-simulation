import React from "react";
import { Switch, Route, Redirect } from 'react-router-dom'
import Simulation from "components/simulation/index";
import { StyledAppContainer, StyledP } from './AppStyles'

function App() {
  return (
    <StyledAppContainer>

      <StyledP>Bug Hunt Camoflage</StyledP>

      <Switch>
        <Route exact path="/" render={() => <Simulation />} />
        <Route exact path="/not_found" render={() => <p>page not found</p>} />
        <Redirect to="/not_found"/>
      </Switch>

    </StyledAppContainer>
  );
}

export default App;
