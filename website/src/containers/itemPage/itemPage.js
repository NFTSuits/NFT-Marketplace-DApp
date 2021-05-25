import React from "react";
import {
  makeStyles,
  Button,
  Grid,
  Container,
  Paper,
  Table,
  TableRow,
  TableCell,
  TableContainer,
  TableHead,
  TableBody,
  Typography,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PanToolSharpIcon from "@material-ui/icons/PanToolSharp";
import LocalOfferSharpIcon from "@material-ui/icons/LocalOfferSharp";
import StarsIcon from "@material-ui/icons/Stars";
import DnsIcon from "@material-ui/icons/Dns";
import ItemButtonGroup from "../../components/itemButtonGroup/itemButtonGroup";
import NftContract from "../../abis/nft.json";

import addresses from "../../constants/contracts";
import { useRecoilCallback } from "recoil";
import {
  allItems,
  itemData,
  myAddress,
  transactionData,
  itemIdAtom,
} from "../../recoils/atoms";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";

{
  /* <div
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}
>
  Hello world
</div>; */
}
const MarketCardData = {
  name: "Kol",
  rarity: "Legendary",
  owner: "Cavit",
  imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
  price: "10",
  auctionPrice: "12",
};

const transactionColors = {
  "On Sale": "#8f84d8ff",
  "Sale Cancelled": "#8058bcff",
  sold: "#b246b1ff",
  "Auction Starts": "#e333a5ff",
  "Auction Cancelled": "#f0388bff",
  Bidded: "#fa7658ff",
  "Sold From Auction": "#ff9a17ff",
  "Bid Withdrawn": "#f7c11fff",
  claimed: "#fd397eff",
};

const useStyles = makeStyles({
  myButton: {
    color: "#00D54B",
    backgroundColor: "#121212",
    height: 42,
    position: "relative",
    top: 7,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 5,
    border: "1px solid",
    borderColor: "#00D54B",
    "&:hover": {
      backgroundColor: "#00D54B",
      borderColor: "#00D54B",
      color: "#000",
    },
  },
});

const ItemPage = (props) => {
  //const [data, setData] = useRecoilState(allItems);
  // const [loading, setLoading] = React.useState(true);

  const [data, setData] = useRecoilState(itemData);
  const [address, setAddress] = useRecoilState(myAddress);
  const [transactions, setTransactions] = useRecoilState(transactionData);
  const [id, setId] = useRecoilState(itemIdAtom);
  React.useEffect(async () => {
    let accounts = await window.ethereum.enable();
    let myAddress = await window.ethereum.selectedAddress;
    setAddress(myAddress);
    const myId = props.match.params.id;
    setId(myId);
    // setLoading(false);

    var nft_contract_interface = new window.web3.eth.Contract(
      NftContract.abi,
      addresses.NFT_CONTRACTS_ADDRESS
    );

    nft_contract_interface.methods
      .tokenByIndex(myId)
      .call()
      .then((currentTokenId) => {
        return nft_contract_interface.methods
          .nfts(currentTokenId - 1)
          .call()
          .then((currentNftData) => {
            nft_contract_interface.methods
              .ownerOf(currentTokenId)
              .call()
              .then((owner) => {
                // console.log("currentTokenId", currentTokenId);
                // console.log("owner", owner);
                setData({ ...currentNftData, owner: owner });
              })
              .catch((error) => {
                console.log(error);
              });
          });
      })
      .catch((error) => {
        console.log(error);
        window.location = "/notFound";
      });

    // nft_contract_interface
    //   .getPastEvents("nftTransaction", {
    //     filter: { id: parseInt(myId) + 1 },
    //     fromBlock: 0,
    //     toBlock: "latest",
    //   })
    //   .then((events) => {
    //     //console.log("events.console.log", events);
    //     events.reverse();
    //     //console.log("events.console.log reverse", events);
    //     setTransactions(events);
    //   });

      nft_contract_interface.events.nftTransaction({
        filter: { id: parseInt(myId) + 1 },
        endBlock:"latest", // Using an array means OR: e.g. 20 or 23
        fromBlock: 0
    }, function(error, event){})
    .on('data', function(event){
        // console.log("on data",event); // same results as the optional callback above
        // event.reverse();
        // setTransactions((prev) => [event,...prev,]);
        // console.log("elma",[...new Set(event)])
        setTransactions((prev) => {
          for (let i = 0; i < prev.length; i++) {
            if(prev[i].id == event.id){
              return prev;
            }
          }
          return [event,...prev];
        } );
    })
    .on('changed', function(event){
        // remove event from local database
        // setTransactions([...event]);
        console.log("event is changed",event);
    })
    .on('error', console.error);
    

    // var event = nft_contract_interface.events.nftTransaction(
    //   (error, result) => {
    //     if (!error) console.log("result", result);
    //   }
    // );
  }, [window.web3.eth]);

  const classes = useStyles();

  if (
    !data ||
    data.owner == undefined ||
    transactions == undefined ||
    id == undefined
  ) {
    return <div>loading</div>;
  }

  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="flex-start"
    >
      <Grid item xs={4}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          style={{ height: "90vh" }}
        >
          {/* <Paper variant="outlined"> */}
          <div
          // style={{
          //   backgroundColor: "#006666",
          // }}
          >
            <img style={{ width: 300 }} src={"https://ipfs.io/ipfs/"+data.cid} />
          </div>
          {/* </Paper> */}
        </Grid>
      </Grid>
      <Grid item xs={8}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          style={{ height: "90vh" }}
        >
          <Grid container style={{ marginTop: 40 }}>
            <Grid item xs={12}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="flex-start"
              >
                {/* <Paper variant="outlined"> */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginLeft: 20,
                  }}
                >
                  <div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <Typography variant="h2" display="block"    gutterbottom="true">
                        Name: {data.name}
                      </Typography>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginBottom: 20,
                      }}
                    >
                      <StarsIcon
                        style={{
                          verticalAlign: "middle",
                          marginTop: 5,
                          marginRight: 10,
                          fontSize: 20,
                        }}
                      />
                      <Typography
                        variant="overline"
                        display="block"
                        gutterbottom="true"
                      >
                        Rarity: {data.rarity}
                      </Typography>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginBottom: 10,
                      }}
                    >
                      <AccountCircleIcon
                        style={{
                          verticalAlign: "middle",
                          marginTop: 15,
                          marginRight: 10,
                          fontSize: 20,
                        }}
                      />
                      <Typography
                        variant="body1"
                        display="block"
                        gutterbottom="true"
                        style={{ marginRight: 10, marginTop: 15 }}
                      >
                        Owner:{" "}
                      </Typography>
                      <Button
                        variant="outlined"
                        className={classes.myButton}
                        onClick={() => {
                          window.location = "/profile/" + data.owner;
                        }}
                      >
                        {data.owner.slice(0, 6) +
                          "..." +
                          data.owner.slice(
                            data.owner.length - 4,
                            data.owner.length
                          )}
                      </Button>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginBottom: 10,
                      }}
                    >
                      <LocalOfferSharpIcon
                        style={{
                          verticalAlign: "middle",
                          marginTop: 3,
                          marginRight: 10,
                          fontSize: 20,
                        }}
                      />
                      <Typography variant="body1" display="block" gutterbottom ="true">
                        Price: {data.isOnSale ? "Ξ " + data.sellPrice : "-"}
                      </Typography>
                    </div>
                    <div>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <PanToolSharpIcon
                          style={{
                            verticalAlign: "middle",
                            marginRight: 10,
                            marginTop: 2,
                            fontSize: 20,
                          }}
                        />
                        <Typography
                          variant="body1"
                          display="block"
                          gutterbottom="true"
                        >
                          Highest Bid:{" "}
                          {data.isBiddable ? "Ξ " + data.maxBid : "-"}
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <div style={{ marginRight: 140, marginTop: 30 }}>
                    <ItemButtonGroup />
                  </div>
                </div>
                {/* </Paper> */}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="flex-start"
              >
                {/* <Paper variant="outlined"> */}
                <TableContainer
                  component={Paper}
                  style={{ marginTop: 50, width: "60vw", height: "40vh" }}
                >
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          align="center"
                          style={{
                            backgroundColor: "#232323",
                          }}
                        >
                          Type
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            backgroundColor: "#232323",
                          }}
                        >
                          From
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            backgroundColor: "#232323",
                          }}
                        >
                          To
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            backgroundColor: "#232323",
                          }}
                        >
                          Amount
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            backgroundColor: "#232323",
                          }}
                        >
                          Txn
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {transactions.map((transaction, index) => {
                        // console.log(transaction);
                        return (
                          <TableRow
                            key={index}
                            style={{
                              backgroundColor:
                                transactionColors[
                                  transaction.returnValues.transactionType
                                ],
                            }}
                          >
                            <TableCell align="center">
                              {transaction.returnValues.transactionType}
                            </TableCell>

                            <TableCell align="center">
                              {transaction.returnValues.fromAddress ==
                              "0x0000000000000000000000000000000000000000" ? (
                                "-"
                              ) : (
                                <Button
                                  size="small"
                                  color="primary"
                                  onClick={() => {
                                    window.location = "/profile/" + data.owner;
                                  }}
                                >
                                  {transaction.returnValues.fromAddress.slice(
                                    0,
                                    6
                                  ) +
                                    "..." +
                                    transaction.returnValues.fromAddress.slice(
                                      transaction.returnValues.fromAddress
                                        .length - 4,
                                      transaction.returnValues.fromAddress
                                        .length
                                    )}
                                </Button>
                              )}
                            </TableCell>
                            <TableCell align="center">
                              {transaction.returnValues.toAddress ==
                              "0x0000000000000000000000000000000000000000" ? (
                                "-"
                              ) : (
                                <Button
                                  size="small"
                                  color="primary"
                                  onClick={() => {
                                    window.location = "/profile/" + data.owner;
                                  }}
                                >
                                  {transaction.returnValues.toAddress.slice(
                                    0,
                                    6
                                  ) +
                                    "..." +
                                    transaction.returnValues.toAddress.slice(
                                      transaction.returnValues.toAddress
                                        .length - 4,
                                      transaction.returnValues.toAddress.length
                                    )}
                                </Button>
                              )}
                            </TableCell>
                            <TableCell align="center">
                              {transaction.returnValues.value == 0
                                ? " - "
                                : "Ξ " + transaction.returnValues.value}
                            </TableCell>
                            <TableCell align="center">
                            <Button
                                  size="small"
                                  color="primary"
                                  onClick={() => {
                                    window.location.href =  "https://ropsten.etherscan.io/tx/" + transaction.transactionHash;
                                  }}
                                >
                              {transaction.transactionHash.slice(0, 6) +
                                "..." +
                                transaction.transactionHash.slice(
                                  transaction.transactionHash.length - 4,
                                  transaction.transactionHash.length
                                )}
                            </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
                {/* </Paper> */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ItemPage;
