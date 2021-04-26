import React from "react";
import Web3 from "web3";
import Button from "@material-ui/core/Button";
import { Container, Typography, Grid, Paper, Avatar } from "@material-ui/core";
import Carousel from "react-elastic-carousel";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
  },
  paperLeft: {
    // padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,

    // minHeight: 600,
    // minWidth: 300,
  },
  paperRight: {
    // padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    // minHeight: 600,
    // minWidth: 600,
  },
  container: {
    paddingTop: 200,
    minWidth: 600,
  },
  large: {
    width: theme.spacing(16),
    height: theme.spacing(16),
  },
  profileLeft: {
    // width: theme.spacing(25),
    // height: theme.spacing(25),
  },
}));

// https://awantoch.medium.com/how-to-connect-web3-js-to-metamask-in-2020-fee2b2edf58a
const Profile = () => {
  const classes = useStyles();

  // const ethEnabled = () => {
  //   if (window.web3) {
  //     window.web3 = new Web3(window.web3.currentProvider);
  //     window.ethereum.enable();
  //     return true;
  //   }
  //   return false;
  // };

  // const connectButton = () => {
  //   if (!ethEnabled()) {
  //     alert("Please install MetaMask to use this dApp!");
  //   }
  //   console.log("window.web3:",window.web3);
  // };

  // return (
  //   <Container maxWidth="md">
  //   <Button
  //     onClick={() => {
  //       connectButton();
  //     }}
  //   >
  //     Connect
  //   </Button>
  //   <Button
  //     onClick={async () =>  {
  //       if (window.web3 && window.web3.eth) {
  //         window.web3 = new Web3(window.web3.currentProvider);
  //         alert(await window.web3.eth.getAccounts());
  //       }
  //       else{
  //         alert("connect your wallet");
  //       }
  //     }}
  //   >
  //   Info
  //   </Button>
  // </Container>
  // );
  return (
    <Container className={classes.container} maxWidth="lg">
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
      >
        <Grid item xs={4}>
          <Paper variant="outlined" className={classes.paper}>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="flex-start"
            >
              <Grid className={classes.profileLeft} item xs={4}>
                <Avatar
                  alt="Remy Sharp"
                  src="https://randomuser.me/api/portraits/lego/5.jpg"
                  className={classes.large}
                />
              </Grid>

              <Grid item xs={7}>
                @gokberkyar
              </Grid>
            </Grid>
            xs=4
          </Paper>
        </Grid>
        <Grid item xs={7}>
          <Paper variant="outlined" className={classes.paper}>
            xs=8
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
