import React from "react";
import Web3 from "web3";
import Button from "@material-ui/core/Button";

const Profile = () => {
  const connectButton = () => {
    console.log("deemee");
  };

  let web3 = null;
  if (typeof web3 !== "undefined" && typeof window.web3 !== "undefined") {
    web3 = new Web3(Web3.currentProvider);
  }

  React.useEffect(async () => {
    const network = await web3.eth.net.getNetworkType();

    console.log(network);
  }, []);

  return (
    <Button
      onClick={() => {
        connectButton();
      }}
    >
      Profile
    </Button>
  );
};

export default Profile;

// import Web3 from "web3";

// let web3 = null;
// if (typeof web3 !== "undefined") {
//   web3 = new Web3(web3.currentProvider);
// } else {
//   // set the provider you want from Web3.providers
//   web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// }

// var web3;

// function init() {
//   if (typeof web3 !== 'undefined') {
//     console.log('Web3 found');
//     window.web3 = new Web3(web3.currentProvider);
//     web3.eth.defaultAccount = web3.eth.accounts[0];
//   } else {
//      console.error('web3 was undefined');
//   }
// }
