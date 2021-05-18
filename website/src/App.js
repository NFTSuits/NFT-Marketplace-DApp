import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";

import CharacterCounter from "./containers/Demo/demo";
import MarketPlace from "./containers/marketPlace/marketPlace";
import Profile from "./containers/profile/profile";
import ItemPage from "./containers/itemPage/itemPage";
import AvatarPage from "./containers/avatarPage/avatarPage";
import NotFoundPage from "./containers/notFoundPage/notFoundPage";

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
          <Route exact path="/allItems" component={MarketPlace} />
        </Switch>
        <Switch>
          <Route path="/profile/:address" component={Profile} />
        </Switch>
        <Switch>
          <Route path="/item/:id" component={ItemPage} />
        </Switch>
        <Switch>
          <Route exact path="/avatars" component={AvatarPage} />
        </Switch>
        <Switch>
          <Route exact path="/notFound" component={NotFoundPage} />
        </Switch>
      </Router>
    </RecoilRoot>
  );
};

export default App;
