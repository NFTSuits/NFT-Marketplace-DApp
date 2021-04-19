import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";

import CharacterCounter from "./containers/Demo/demo";

const App = () => {
  return (
    <RecoilRoot>
      <Router>
        <Switch>
          <Route exact path="/demo" component={CharacterCounter} />
        </Switch>
      </Router>
    </RecoilRoot>
  );
};

export default App;
