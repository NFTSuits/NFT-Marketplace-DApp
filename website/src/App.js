import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CharacterCounter from "./containers/Demo/demo";
import MarketPlace from "./containers/marketPlace/marketPlace";
import Profile from "./containers/profile/profile";
import ItemPage from "./containers/itemPage/itemPage";
import IndexPage from "./containers/index/index";
import NotFoundPage from "./containers/notFoundPage/notFoundPage";
import CssBaseline from "@material-ui/core/CssBaseline";
import Navbar from "./components/navbar/navbar";
const App = () => {
  const [metamask, setMetamask] = React.useState(false);
  const darkTheme = createMuiTheme({
    palette: {
      background: {
        paper: "#121212",
        default: "#121212",
      },
      //paper: { text: { primary: "#f1ffe3", secondary: "#f1ffe3" } },
      text: {
        primary: "#f1ffe3",
        secondary: "#f1ffe3",
        //paper: { primary: "#f1ffe3", secondary: "#f1ffe3" },
      },
      type: "dark",
      primary: {
        // Purple and green play nicely together.
        main: "#040404",
      },
      secondary: {
        // This is green.A700 as hex.
        main: "#11cb5f",
      },
      abc: {
        main: "#00D54B",
        hover: {
          //backgroundColor: "#00D54B",
          borderColor: "#00D54B",
          color: "#00D54B",
        },
      },
    },
    status: {
      danger: "#0000ff",
    },
  });

  React.useEffect(() =>{
    if(!window.eth && !window.ethereum){
      setMetamask(false);
    }
    else{
      setMetamask(true);
    }
  },[window.eth, window.ethereum]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RecoilRoot>
        {metamask && <Navbar />}
        <Router>
          <Switch>
            <Route exact path="/" component={IndexPage} />
          </Switch>
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
          {/* <Switch>
            <Route exact path="/avatars" component={AvatarPage} />
          </Switch> */}
          <Switch>
            <Route exact path="/notFound" component={NotFoundPage} />
          </Switch>
        </Router>
      </RecoilRoot>
    </ThemeProvider>
  );
};

export default App;
