import React from "react";
import { Switch, Route, Redirect } from 'react-router-dom'
import Simulation from "components/simulation/Simulation";
import Info from "components/info/index"
import Header from "components/header/index"
import Footer from "components/footer/index"
import { StyledAppContainer, StyledSubContainer1 } from './AppStyles'

function App() { 
  return (
    <StyledAppContainer>
      <StyledSubContainer1>
        <Header />
        <Switch>
          <Route exact path="/" render={() => <Simulation />} />
          <Route exact path="/info" render={() => <Info />} />
          <Route exact path="/not_found" render={() => <p>page not found</p>} />
          <Redirect to="/not_found"/>
        </Switch>
      </StyledSubContainer1>
      <Footer />
    </StyledAppContainer>
  );
}

export default App;
