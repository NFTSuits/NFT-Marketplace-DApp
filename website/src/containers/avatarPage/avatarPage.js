import React from "react";
import { Container, Typography, Button } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import AvatarTab from "../../components/avatarCard/avatarTab";
import Web3 from "web3";
import * as fs from "fs";

import AvatarCardList from "../../components/avatarCard/avatarCardList";

import NftContract from "../../abis/nft.json";


import addresses from "../../constants/contracts";
import { useRecoilCallback } from "recoil";
import {
  allItems,
  isBiddable,
  isOnSale,
  rarityLevel,
} from "../../recoils/atoms";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

// const username_abi = JSON.parse(contractJson);

const AvatarPage = () => {
  const classes = useStyles();
  const [address, setAddress] = React.useState();
  const [avatarList, setAvatarList] = React.useState([]);

  const [data, setData] = useRecoilState(allItems);

  if(!window.eth && !window.ethereum){
    window.location.href = window.location.origin;
  }

  // var web3 = new Web3("http://localhost:8545");

  // React.useEffect(async () => {
  //   var smart_contract_interface = new window.web3.eth.Contract(
  //     Username.abi,
  //     "0x3635497D85eD625239632bfB8f25A3c06eBd6a77"
  //   );
  //   console.log("methods:", smart_contract_interface.methods);
  // }, [window.web3.eth]);

  React.useEffect(async () => {
    let accounts = await window.ethereum.enable();
    let myAddress = await window.ethereum.selectedAddress;
    setAddress(myAddress);

    var nft_contract_interface = new window.web3.eth.Contract(
      NftContract.abi,
      addresses.NFT_CONTRACTS_ADDRESS
    );


    nft_contract_interface
    .getPastEvents("nftTransaction", {
      fromBlock: 0,
      toBlock: "latest",
    })
    .then((events) => {
      events.reverse();
      let possibleAddresses = []
      for (var i = 0; i < events.length; i++) {
        if (events[i].returnValues["transactionType"] === "sold" || events[i].returnValues["transactionType"] === "Sold From Auction"){
          possibleAddresses.push(events[i].returnValues["toAddress"])
        }
      }
      var setOfAddresses = new Set(possibleAddresses);
      var setOfAddressesList = Array.from(setOfAddresses);

      Promise.all(
        setOfAddressesList.map((address) => {
          return Promise.resolve(
            nft_contract_interface.methods
              .users(address)
              .call()
              .then(async (data) => {
                let headImg = "";
                let middleImg = "";
                let bottomImg = "";
                if (data.head != 0 && data.middle != 0 && data.bottom != 0) {
                  headImg = await nft_contract_interface
                                  .methods
                                  .nfts(data.head - 1)
                                  .call()
                                  .then((data) => {
                                    return data.cid
                                  })
                  
                  middleImg = await nft_contract_interface
                                    .methods
                                    .nfts(data.middle - 1)
                                    .call()
                                    .then((data) => {
                                      return data.cid
                                    })

                  bottomImg = await nft_contract_interface
                                    .methods
                                    .nfts(data.bottom - 1)
                                    .call()
                                    .then((data) => {
                                      return data.cid
                                    })
                  return {
                    "headImg": headImg,
                    "middleImg": middleImg,
                    "bottomImg": bottomImg,
                    "username": data.username === "" ? address.slice(0, 4) + "..." + address.slice(address.length - 2, address.length) : data.username,
                    "address": address
                  }
                }
                
              })
          )
      
        })
      )
      .then((data) => {
        let newData = (data.filter(function(ele){ 
          return ele != undefined; 
        }))
        setAvatarList(newData);
      })
      .catch((err) => {
        console.log("err", err)
      });
    })     

  }, [window.web3.eth]);


  return (
    <Container maxWidth="md">
      <Typography variant="h4" style={{ marginBottom: 20, marginTop: 30 }}>
        Avatars
      </Typography>
      {/* {address && <> {address}</>} */}

      <div style={{ marginTop: 10 }} className={classes.root}>
        {avatarList.length ? <AvatarCardList avatarCards={avatarList} /> : <>No Items Found</>}
      </div>
      {/* <div>
        {data.map((item) => {
          //console.log("item", item);
          return item.name;
        })}
      </div> */}
      {/* <div>{data.length}</div>
      <Button onClick={() => console.log("button data", data)}>mybutton</Button> */}
    </Container>
  );
};

export default AvatarPage;
