import React from "react";
import { Container, Typography } from "@material-ui/core";
import MarketTab from "../../components/marketCard/marketTab";
import Web3 from "web3";
import * as fs from "fs";

import Username from "../../abis/username.json";

// const { username_abi } = require("../../abis/username.abi");
// const contractJson = fs.readFileSync("../../abis/username.json");
// const username_abi = JSON.parse(contractJson);

const MarketPlace = () => {
  const [address, setAddress] = React.useState();
  // var web3 = new Web3("http://localhost:8545");

  // React.useEffect(async () => {
  //   var smart_contract_interface = new window.web3.eth.Contract(
  //     Username.abi,
  //     "0x3635497D85eD625239632bfB8f25A3c06eBd6a77"
  //   );
  //   console.log("methods:", smart_contract_interface.methods);
  // }, [window.web3.eth]);

  React.useEffect(async () => {
    let myAddress = await window.ethereum.selectedAddress;
    setAddress(myAddress);
  }, [window.web3.eth]);

  return (
    <Container maxWidth="md">
      <Typography
        variant="h4"
        color="primary"
        style={{ marginBottom: 20, marginTop: 30 }}
      >
        MarketPlace
      </Typography>
      {address && <> {address}</>}

      <MarketTab style={{ marginTop: 10 }} />
    </Container>
  );
};

export default MarketPlace;
