import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
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
import {  useRecoilValue, useRecoilState } from "recoil";
import { snackbarControllerAtom, snackbarTextAtom,  } from "./recoils/atoms";
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

const App = () => {
  const [metamask, setMetamask] = React.useState(false);

  const [snackbarController, setSnackbarController] = useRecoilState(snackbarControllerAtom);
  const snackbarText = useRecoilValue(snackbarTextAtom);



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
    <>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
     
        {metamask && <Navbar />}
        <Router>
          <Switch>
            <Route exact path="/" component={IndexPage} />
            <Route  path="/demo" component={CharacterCounter} />
            <Route  path="/marketplace" component={MarketPlace} />
            <Route  path="/allItems" component={MarketPlace} />
            <Route path="/profile/:address" component={Profile} />
            <Route path="/item/:id" component={ItemPage} />
             {/* <Route exact path="/avatars" component={AvatarPage} />*/}
            <Route  path="/notFound" component={NotFoundPage} />
            <Route component={NotFoundPage} />
          </Switch>


          <Snackbar
              open={snackbarController}
              autoHideDuration={8000}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              onClose={()=>{
                setSnackbarController(false)
              }}
          >
            <SnackbarContent style={{
                backgroundColor:'#ff2015',
                color:"#f2f2f2",
                }}
                message={<span id="client-snackbar" >{snackbarText}</span>}
            />
          </Snackbar>
        </Router>
   
    </ThemeProvider>

  
    </>
  );
};

export default App;
