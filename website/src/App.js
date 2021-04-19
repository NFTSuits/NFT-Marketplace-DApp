import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";

import CharacterCounter from "./containers/Demo/demo";
import MarketPlace from "./containers/marketPlace/marketPlace";

import Navbar from "./components/navbar/navbar";
const App = () => {
  return (
    <RecoilRoot>
      <Navbar />
      <Router>
        <Switch>
          <Route exact path="/demo" component={CharacterCounter} />
        </Switch>
        <Switch>
          <Route exact path="/marketplace" component={MarketPlace} />
        </Switch>
      </Router>
    </RecoilRoot>
  );
};

export default App;
