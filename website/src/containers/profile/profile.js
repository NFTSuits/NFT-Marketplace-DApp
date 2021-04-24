import React from "react";
import Web3 from "web3";
import Button from "@material-ui/core/Button";
import { Container, Typography } from "@material-ui/core";
// https://awantoch.medium.com/how-to-connect-web3-js-to-metamask-in-2020-fee2b2edf58a
const Profile = () => {

  const ethEnabled = () => {
    if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      window.ethereum.enable();
      return true;
    }
    return false;
  };

  const connectButton = () => {
    if (!ethEnabled()) {
      alert("Please install MetaMask to use this dApp!");
    }
    console.log("window.web3:",window.web3);
  };

  return (
    <Container maxWidth="md">
    <Button
      onClick={() => {
        connectButton();
      }}
    >
      Connect
    </Button>
    <Button
      onClick={async () =>  {
        if (window.web3 && window.web3.eth) {
          window.web3 = new Web3(window.web3.currentProvider);
          alert(await window.web3.eth.getAccounts());
        }
        else{
          alert("connect your wallet");
        }
      }}
    >
    Info
    </Button>
  </Container>
  );
};

export default Profile;