import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";

import CharacterCounter from "./containers/Demo/demo";
import MarketPlace from "./containers/marketPlace/marketPlace";
import Profile from "./containers/profile/profile";
import ItemPage from "./containers/itemPage/itemPage";

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
        <Switch>
          <Route path="/profile" component={Profile} />
        </Switch>
        <Switch>
          <Route path="/itempage" component={ItemPage} />
        </Switch>
      </Router>
    </RecoilRoot>
  );
};

export default App;
