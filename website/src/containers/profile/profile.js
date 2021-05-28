import React from "react";
import Web3 from "web3";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Avatar,
  AppBar,
  Tab,
  Tabs,
  Box,
  Button,
  IconButton,
  Switch,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  Select,
  Input,
  TextField,
  Tooltip,
} from "@material-ui/core";

import EditSharpIcon from "@material-ui/icons/EditSharp";
import SaveIcon from "@material-ui/icons/Save";

import FaceIcon from "@material-ui/icons/Face";
import KeyboardArrowRightRoundedIcon from "@material-ui/icons/KeyboardArrowRightRounded";
import KeyboardArrowLeftRoundedIcon from "@material-ui/icons/KeyboardArrowLeftRounded";

import Carousel, { consts } from "react-elastic-carousel";

import { withStyles, makeStyles } from "@material-ui/core/styles";

import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";

import { atom, selector, useRecoilState, useRecoilValue } from "recoil";

// import headPlaceholder from'./headPlaceholder.png';
// import topPlacehoder from'./topPlaceholder.png';
// import bottomPlaceholder from'./bottomPlaceholder.png';


import {
  myUsername,
  myAddress,
  allItems,
  profileDataAtom,
  isBiddable,
  isOnSale,
  rarityLevel,
  isThirdPersonAtom,
  transactionData,
  snackbarTextAtom, 
  snackbarControllerAtom,
} from "../../recoils/atoms";
import {
  getMyUsername,
  getHeads,
  getMiddles,
  getBottoms,
  unFilteredGetHeads,
  unFilteredGetMiddles,
  unFilteredGetBottoms,
  getAllItemsFiltered,
} from "../../recoils/selectors";

import NftContract from "../../abis/nft.json";
import addresses from "../../constants/contracts";

import MarketCardList from "../../components/marketCard/marketCardList";

import { getUsername } from "../../utils/getUsernameFromAddress";

const tabValueState = atom({
  key: "tabValueState", // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (aka initial value)
});

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
    paddingTop: 40,
    minWidth: 600,
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  profileLeft: {
    // width: theme.spacing(25),
    // height: theme.spacing(25),
  },
  numberTextStyle: {
    //color: "black",
    marginBottom: 30,
    textAlign: "center",
    fontWeight: "bold",
  },
  carouselStyle: {
    width: 300,
  },
  myButton: {
    color: "#000",
    backgroundColor: "#00D54B",
    height: 42,
    position: "relative",
    top: 7,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 5,
    border: "1px solid",
    borderColor: "#00D54B",
    "&:hover": {
      backgroundColor: "#121212",
      borderColor: "#00D54B",
      color: "#00D54B",
    },
  },
  myMoneyButton: {
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
  arrowButton: {
    rec: {
      recArrow: {
        backgroundColor: "#00D54B",
      },
    },
    /* round buttons on hover */
    rec: {
      recArrow: {
        "&hover": {
          backgroundColor: "#00D54B",
        },
      },
    },
  },
}));

async function getRevertReason(txHash, setSnackbarText, setSnackbarController) {
  const tx = await window.web3.eth.getTransaction(txHash)

  var result = await window.web3.eth.call(tx)
  .then((data) => {console.log("DATAAAAA", data)})
  .catch((error) => {
    var index = error.message.indexOf("{");
    return JSON.parse(error.message.substring(index).trim()).originalError.message;
  })
  setSnackbarController(true);
  setSnackbarText(result);
  return result;
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const MyTooltip = withStyles((theme) => ({
  tooltip: {
    // backgroundColor: '#f5f5f9',
    // color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 20,
    // maxWidth: 220,
    // fontSize: theme.typography.pxToRem(12),
    // border: '1px solid #dadde9',
  },
}))(Tooltip);

// https://awantoch.medium.com/how-to-connect-web3-js-to-metamask-in-2020-fee2b2edf58a
const Profile = (props) => {
  const classes = useStyles();
  const [profileAddress, setProfileAdress] = React.useState(
    props.match.params.address
  );

  const [numberSold, setNumberSold] = React.useState(0);
  const [earnedSold, setEarnedSold] = React.useState(0);
  const [buttonTrigger, setButtonTrigger] = React.useState(false);

  const [numberBought, setNumberBought] = React.useState(0);
  const [spentBought, setSpentBought] = React.useState(0);

  const [isLoading, setIsLoading] = React.useState(true);

  const [profileData, setProfileData] = useRecoilState(profileDataAtom);

  const [address, setAddress] = useRecoilState(myAddress);

  const [data, setData] = useRecoilState(allItems);

  const [isThirdPerson, setIsThirdPerson] = useRecoilState(isThirdPersonAtom);

  const [snackbarText, setSnackbarText] = useRecoilState(snackbarTextAtom);
  const [snackbarController, setSnackbarController] = useRecoilState(snackbarControllerAtom);

  const heads = useRecoilValue(getHeads);
  const middles = useRecoilValue(getMiddles);
  const bottoms = useRecoilValue(getBottoms);
  const unFilteredHeads = useRecoilValue(unFilteredGetHeads);
  const unFilteredMiddles = useRecoilValue(unFilteredGetMiddles);
  const unFilteredBottoms = useRecoilValue(unFilteredGetBottoms);

  if(!window.eth && !window.ethereum){
    window.location.href = window.location.origin;
  }
  // //const [transactions, setTransactions] = useRecoilState(transactionData);

  // const [firstPersonUsername, setFirstPersonUsername] =
  // useRecoilState(myUsername);

  // console.log("profile all items", data);

  // React.useEffect(async () => {
  //   if(window.eth){
  //   try {
  //     window.web3 = new Web3("http://localhost:8545");
  //     if (window.ethereum) {
  //       await window.ethereum.enable(); // pop up
  //       let myAddress = await window.ethereum.selectedAddress;
  //     }
  //   } catch (err) {
  //     console.log("err",err);
  //   }}
  //   else{
  //     console.log("deneme")
  //     window.web3 = new Web3("http://localhost:8545");
  //   }
  // }, []);

  React.useEffect(async () => {
    let accounts = await window.ethereum.enable();
    let myAddress = await window.ethereum.selectedAddress;

    setAddress(myAddress);

    // console.log("profileaddress", profileAddress);
    // console.log("myaddress", myAddress);

    setIsThirdPerson(myAddress.toLowerCase() !== profileAddress.toLowerCase());

    var nft_contract_interface = new window.web3.eth.Contract(
      NftContract.abi,
      addresses.NFT_CONTRACTS_ADDRESS
    );

    const username_temp = await getUsername(
      nft_contract_interface,
      profileAddress
    );
    // ).then((data) => {
    //   console.log("datadata", data);
    //   setFirstPersonUsername(data.username);
    // });
    // console.log("awaited username", username_temp);
    setProfileData(username_temp);
    // window.ethereum.enable();

    // console.log("profileAddress", profileAddress);
    nft_contract_interface.methods
      .tokensOfOwner(profileAddress)
      .call()
      .then((tokenList) => {
        // console.log("token list of owner", profileAddress, tokenList);

        Promise.all(
          tokenList.map((tokenId) => {
            // console.log("tokenId", tokenId);
            return Promise.resolve(
              nft_contract_interface.methods
                .nfts(tokenId - 1)
                .call()
                .then((currentNftData) => {
                  //the request below can be send with
                  //the same time of methods.nfts()
                  //how
                  //but need to do promise againever it makes the code more efficient

                  return nft_contract_interface.methods
                    .ownerOf(tokenId)
                    .call()
                    .then((owner) => {
                      return {
                        ...currentNftData,
                        id: tokenId - 1,
                        tokenId: tokenId,
                        owner: owner,
                      };
                    });
                })
            );
          })
        )
          .then((values) => {
            setData(values);
          })
          .catch((err) => console.log("err", err));
      });
    // contract.getPastEvents("allEvents", { fromBlock: 1}).then(console.log);
    nft_contract_interface
      .getPastEvents("nftTransaction", {
        fromBlock: 0,
        toBlock: "latest",
      })
      .then((events) => {
        // setTransactions(events);

        //          [numberSold, setNumberSold]
        //          [earnedSold, setEarnedSold]
        //          [numberBought, setNumberBought]
        //          [spentBought, setSpentBought]

        //TODO: bu doğru muhtemelen ama kontrol edilmeli
        //FIXME: Doğruluğundan emin değilim
        const soldItems = events.filter((item) => {
          // console.log("item ==> ", item);
          return (
            (item.returnValues[1] === "sold" || item.returnValues[1] === "Sold From Auction") &&
            item.returnValues[2].toLowerCase() === profileAddress.toLowerCase()
          );
        });
        setNumberSold(soldItems.length);
        var sum = 0;
        soldItems.forEach((item) => {
          sum += parseInt(item.returnValues[4]);
        });
        setEarnedSold(sum);
        const boughtItems = events.filter((item) => {
          return (
            (item.returnValues[1] === "sold" || item.returnValues[1] === "Sold From Auction") &&
            item.returnValues[3].toLowerCase() === profileAddress.toLowerCase()
          );
        });
        setNumberBought(boughtItems.length);
        sum = 0;
        boughtItems.forEach((item) => {
          sum += parseInt(item.returnValues[4]);
        });
        setSpentBought(sum);
      });
    setIsLoading(false);
    console.log("useeffect 😫😩😫😩");
  }, [window.web3.eth,buttonTrigger]);

  const UpperProfile = () => {
    const classes = useStyles();
    const [firstPersonUsername, setFirstPersonUsername] =
      useRecoilState(myUsername);
    const isThirdPerson = useRecoilValue(isThirdPersonAtom);

    //const [, set] = React.useState();
    const [isSetting, setIsSetting] = React.useState(false);
    const [usernameEditText, setUsernameEditText] = React.useState("");

    const [profileData, setProfileData] = useRecoilState(profileDataAtom);

    return (
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        <Grid className={classes.profileLeft} item xs={4}>
          <Avatar
            variant="square"
            alt="Remy Sharp"
            src={unFilteredHeads.findIndex((item) => profileData.head === item.tokenId) !==
              -1
                ? "https://ipfs.io/ipfs/"+data[data.findIndex((item) => profileData.head === item.tokenId)].cid
                : 0
              }
            className={classes.large}
          />
        </Grid>

        {/* <Grid item xs={6} direction="row"> */}
        <div style={{ display: "flex", flexDirection: "row" }}>
          {isSetting ? (
            <TextField
              value={usernameEditText}
              onChange={(event) => setUsernameEditText(event.target.value)}
              // onChange={(event) => {
              //   // event.stopPropagation();
              //   // event.preventDefault();
              //   setUsernameEditText(event.target.value);
              //   console.log("event.target.value", event.target.value);
              //   console.log("event.target", event.target);
              //   console.log("issetting", isSetting);
              // }}
            />
          ) : (
            <Typography variant="h5">
              @{isThirdPerson ? profileData.username : firstPersonUsername}
            </Typography>
          )}

          {isSetting && !isThirdPerson ? (
            <IconButton
              //style={{ marginTop: -15 }}
              color="primary"
              onClick={async (event) => {
                // console.log(event.target.value);
                let myAddress = await window.ethereum.selectedAddress;

                var nft_contract_interface = new window.web3.eth.Contract(
                  NftContract.abi,
                  addresses.NFT_CONTRACTS_ADDRESS
                );
                nft_contract_interface.methods
                  .setUsername(usernameEditText)
                  .send({ from: myAddress })
                  .on("transactionHash", function (hash) {
                    console.log(hash);
                  })
                  .on("confirmation", function (confirmationNumber, receipt) {
                    console.log(confirmationNumber, receipt);
                   // setButtonTrigger(!buttonTrigger);
                  })
                  .on("receipt", async function (receipt) {
                    // receipt example
                    console.log(receipt);
                    getUsername(nft_contract_interface, myAddress).then(
                      (data) => {
                        console.log(data);
                        setFirstPersonUsername(data.username);
                        setIsSetting(false);
                       // setButtonTrigger(!buttonTrigger);
                       window.location.reload();
                      }
                    );
                  })
                  .on("error", async function (error, receipt) {
                    console.log(error, receipt);
                    var error_message = await getRevertReason(receipt.transactionHash, setSnackbarText, setSnackbarController);
                    setIsSetting(false);
                  });
              }}
            >
              <SaveIcon style={{ color: "#00D54B" }} />
            </IconButton>
          ) : !isThirdPerson ? (
            <IconButton
              style={{ marginTop: -9 }}
              color="primary"
              onClick={() => {
                setIsSetting(true);
              }}
            >
              <EditSharpIcon style={{ color: "#00D54B" }} />
            </IconButton>
          ) : (
            <></>
          )}
        </div>
        {/* </Grid> */}
      </Grid>
    );
  };

  const LowerProfile = () => {
    const classes = useStyles();
    const [firstPersonUsername, setFirstPersonUsername] =
      useRecoilState(myUsername);
    const isThirdPerson = useRecoilValue(isThirdPersonAtom);

    const regex = /^([0-9]+(\.[0-9]+)?)$/g;
    const [withdrawMoneyTextFieldError, setwithdrawMoneyTextFieldError] = React.useState(false);

    //const [, set] = React.useState();
    // const [isSetting, setIsSetting] = React.useState(false);
    const [withdrawAmount, setWithdrawAmount] = React.useState(0);
    const [usernameEditText, setUsernameEditText] = React.useState("");

    const [profileData, setProfileData] = useRecoilState(profileDataAtom);

    const onWithdrawPress = async () => {
      // console.log("amount:", withdrawAmount);
      let myAddress = await window.ethereum.selectedAddress;

      var nft_contract_interface = new window.web3.eth.Contract(
        NftContract.abi,
        addresses.NFT_CONTRACTS_ADDRESS
      );
      nft_contract_interface.methods
        .withdrawMoney(window.web3.utils.toWei(withdrawAmount))
        .send({ from: myAddress })
        .on("transactionHash", function (hash) {
          console.log(hash);
         // setButtonTrigger(!buttonTrigger);
        })
        .on("confirmation", function (confirmationNumber, receipt) {
          console.log(confirmationNumber, receipt);
         // setButtonTrigger(!buttonTrigger);
        })
        .on("receipt", async function (receipt) {
          // receipt example
          console.log(receipt);
          window.location.reload();
         // setButtonTrigger(!buttonTrigger);
        })
        .on("error", async function (error, receipt) {
          console.log(error, receipt);
          var error_message = await getRevertReason(receipt.transactionHash, setSnackbarText, setSnackbarController);
        });
    };

    return (
      <>
        <Grid
          style={{ marginTop: 30 }}
          container
          direction="row"
          justify="space-around"
          alignItems="flex-start"
        >
          {/* {heads.length() + middles.length() + bottoms.length()} */}
          <Grid item xs={3}>
            <Typography variant="h5">
              #Items
              {/* {console.log("transactions", transactions)} */}
            </Typography>
            <Typography variant="h5" className={classes.numberTextStyle}>
              {unFilteredHeads.length + unFilteredMiddles.length + unFilteredBottoms.length}
            </Typography>
            <Typography variant="h5">Spent</Typography>
            <MyTooltip title={window.web3.utils.fromWei(spentBought.toString())} arrow>
              <Typography variant="h5" className={classes.numberTextStyle}>
                {window.web3.utils.fromWei(spentBought.toString()).slice(0,4)} Ξ
              </Typography>
            </MyTooltip>
            <Typography variant="h5">Earned</Typography>
            <MyTooltip title={window.web3.utils.fromWei(earnedSold.toString())} arrow>
              <Typography variant="h5" className={classes.numberTextStyle}>
                {window.web3.utils.fromWei(earnedSold.toString()).slice(0,4)} Ξ
              </Typography>
            </MyTooltip>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h5">#combinations</Typography>
            <Typography variant="h5" className={classes.numberTextStyle}>
              {(unFilteredHeads.length + 1) * (unFilteredMiddles.length + 1) * (unFilteredBottoms.length + 1)}
            </Typography>
            <Typography variant="h5">#Bought</Typography>
            <Typography variant="h5" className={classes.numberTextStyle}>
              {numberBought}
            </Typography>
            <Typography variant="h5">#Sold</Typography>
            <Typography variant="h5" className={classes.numberTextStyle}>
              {numberSold}
            </Typography>
          </Grid>
        </Grid>

        {!isThirdPerson && (
          <>
            <div style={{ display: "flex", flexDirection: "row" }}>{/*  */}
              <MyTooltip title={window.web3.utils.fromWei(profileData.userBalance.toString())} placement="top" arrow>
                <Typography>Balance: {window.web3.utils.fromWei(profileData.userBalance.toString()).slice(0, 4)} Ξ</Typography>
              </MyTooltip>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <TextField
                error={withdrawMoneyTextFieldError}
                onChange={(event) => {
                  // console.log(event.target.value);
                  if(event.target.value.toString().match(regex)) {
                    setwithdrawMoneyTextFieldError(false);
                  }
                  else {
                    setwithdrawMoneyTextFieldError(true);
                  }
                  setWithdrawAmount(event.target.value);
                }}
                label="Amount"
                id="outlined-margin-none"
                className={classes.textField}
                margin="dense"
                helperText="You need to give a valid amount."
                variant="outlined"
              />
              <Button
                disabled={withdrawMoneyTextFieldError}
                className={classes.myMoneyButton}
                onClick={() => {
                  onWithdrawPress();
                }}
              >
                Withdraw
              </Button>
            </div>
          </>
        )}
      </>
    );
  };

  const ProfileLeftMenu = () => {
    const classes = useStyles();

    return (
      // <Paper variant="outlined" className={classes.paper}>
      <>
        <UpperProfile />
        <LowerProfile />
      </>
      // </Paper>
    );
  };

  const ProfileRightMenu = () => {
    const classes = useStyles();

    return (
      // <Paper variant="outlined" className={classes.paper}>
      <>
        <ProfileTabBar />
        <ProfileTabPanel />
      </>
      // </Paper>
    );
  };

  const ProfileTabBar = () => {
    const StyledTabs = withStyles({
      indicator: {
        top: 5,
        bottom: 5,
        marginLeft: 4,
        height: "80%",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "transparent",
        "& > span": {
          borderRadius: 10,
          width: "100%",
          backgroundColor: "#000",
          opacity: 0.15,
        },
      },
    })((props) => (
      <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />
    ));

    const StyledTab = withStyles((theme) => ({
      root: {
        textTransform: "none",
        color: "#000",
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(15),
        marginRight: theme.spacing(1),
        "&:focus": {
          opacity: 1,
        },
        alignSelf: "center",
      },
    }))((props) => <Tab disableRipple {...props} />);

    const [value, setValue] = useRecoilState(tabValueState);
    const username = useRecoilValue(myUsername);
    const address = useRecoilValue(myAddress);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    function a11yProps(index) {
      return {
        id: `scrollable-force-tab-${index}`,
        "aria-controls": `scrollable-force-tabpanel-${index}`,
      };
    }

    return (
      <Grid
        style={{ marginTop: 30 }}
        container
        direction="row"
        justify="space-around"
        alignItems="flex-start"
      >
        <Grid item xs={8}>
          <AppBar
            style={{
              backgroundColor: "#00D54B",
              width: "%40",
              maxWidth: "300",
              borderRadius: 10,
            }}
            position="static"
            color="default"
          >
            <StyledTabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              scrollButtons="on"
              indicatorColor="primary"
              textColor="primary"
              aria-label="scrollable force tabs example"
            >
              <StyledTab
                label={
                  <div>
                    <FaceIcon
                      style={{ verticalAlign: "middle", marginRight: 4 }}
                    />{" "}
                    Avatar
                  </div>
                }
                {...a11yProps(0)}
              />
              <StyledTab
                label={
                  <div>
                    <AccessibilityNewIcon
                      style={{ verticalAlign: "middle", marginRight: 4 }}
                    />{" "}
                    All items
                  </div>
                }
                {...a11yProps(1)}
              />
            </StyledTabs>
          </AppBar>
        </Grid>
      </Grid>
    );
  };
  const ProfileTabPanel = () => {
    const value = useRecoilValue(tabValueState);

    return (
      <>
        <TabPanel value={value} index={0}>
          <ProfileAvatar />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ProfileAllItems />
        </TabPanel>
      </>
    );
  };

  const ProfileAvatar = () => {
    const classes = useStyles();

    const profileData = useRecoilValue(profileDataAtom);
    const heads = useRecoilValue(getHeads);
    const middles = useRecoilValue(getMiddles);
    const bottoms = useRecoilValue(getBottoms);

    const isThirdPerson = useRecoilValue(isThirdPersonAtom);

    const headTry = heads.findIndex((item) => profileData.head == item.tokenId);
    const headStartingIndex = headTry !== -1 ? headTry : -1;

    const middleTry = middles.findIndex(
      (item) => profileData.middle == item.tokenId
    );
    const middleStartingIndex = middleTry !== -1 ? middleTry : -1;

    const bottomTry = bottoms.findIndex(
      (item) => profileData.bottom == item.tokenId
    );
    const bottomStartingIndex = bottomTry !== -1 ? bottomTry : -1;

    const [selectedHeadIndex, setSelectedHeadIndex] =
      React.useState(headStartingIndex);
    const [selectedMiddleIndex, setSelectedMiddleIndex] =
      React.useState(middleStartingIndex);
    const [selectedBottomIndex, setSelectedBottomIndex] =
      React.useState(bottomStartingIndex);

    return (
      <Grid
        style={{ marginTop: 30 }}
        container
        direction="row"
        justify="space-around"
        alignItems="flex-start"
      >
        <Grid item xs={8}>
          {/* <Paper variant="outlined" className={classes.paper}> */}
          <Carousel
            //enableSwipe={false}
            renderArrow={({ type, onClick, isEdge }) => {
              const pointer =
                type === consts.PREV ? (
                  <KeyboardArrowLeftRoundedIcon
                    style={{
                      fontSize: 50,
                      color: isEdge ? "#343434" : "#00D54B",
                    }}
                  />
                ) : (
                  <KeyboardArrowRightRoundedIcon
                    style={{
                      fontSize: 50,
                      color: isEdge ? "#343434" : "#00D54B",
                    }}
                  />
                );
              return (
                <Button onClick={onClick} disabled={isEdge}>
                  {pointer}
                </Button>
              );
            }}
            enableMouseSwipe={false}
            showArrows={!isThirdPerson ? true : false}
            enableSwipe={!isThirdPerson ? true : false}
            pagination={false}
            initialActiveIndex={
              heads.findIndex((item) => profileData.head === item.tokenId) !==
              -1
                ? heads.findIndex((item) => profileData.head === item.tokenId) +
                  1
                : 0
            }
            onChange={(currentItem, pageIndex) => {
              setSelectedHeadIndex(pageIndex - 1);
            }}
          >
            <Avatar
              style={{width: 70, height: 70}}
              variant="square"
              alt="empty"
              src="https://ipfs.io/ipfs/QmNmqHvvhjcoUNZcffdKpASf3cPmRJkyzcixk7zvQPGHtz"
              className={classes.large}
              key="gorkem"
            />
            {heads.map((item) => (
              <Button style={{padding:0}} onClick={() => {
                window.location.href = "/item/" + item.id;
              }}>
              <Avatar
                style={{width: 70, height: 70}}
                variant="square"
                alt={item.name}
                src={"https://ipfs.io/ipfs/"+item.cid}
                className={classes.large}
                key={item.cid}
              />
              </Button>
            ))}
          </Carousel>
          {/* </Paper> */}
          {/* <Paper variant="outlined" className={classes.paper}> */}
          <Carousel
            //enableSwipe={false}
            renderArrow={({ type, onClick, isEdge }) => {
              const pointer =
                type === consts.PREV ? (
                  <KeyboardArrowLeftRoundedIcon
                    style={{
                      fontSize: 50,
                      color: isEdge ? "#343434" : "#00D54B",
                    }}
                  />
                ) : (
                  <KeyboardArrowRightRoundedIcon
                    style={{
                      fontSize: 50,
                      color: isEdge ? "#343434" : "#00D54B",
                    }}
                  />
                );
              return (
                <Button onClick={onClick} disabled={isEdge}>
                  {pointer}
                </Button>
              );
            }}
            enableMouseSwipe={false}
            showArrows={!isThirdPerson ? true : false}
            enableSwipe={!isThirdPerson ? true : false}
            pagination={false}
            initialActiveIndex={
              middles.findIndex(
                (item) => profileData.middle == item.tokenId
              ) !== -1
                ? middles.findIndex(
                    (item) => profileData.middle == item.tokenId
                  ) + 1
                : 0
            }
            onChange={(currentItem, pageIndex) => {
              setSelectedMiddleIndex(pageIndex - 1);
            }}
          >
            <Avatar
              style={{width: 130, height: 150}}
              variant="square"
              alt="empty"
              src="https://ipfs.io/ipfs/QmR2LR7y2kXEeG3sgUq7jNpWM61XbVJB1N5scjjRj5Wqfr"
              className={classes.large}
              key="gorkem 2"
            />
            {middles.map((item) => (
              <Button style={{padding:0}}
               onClick={() => {
                window.location.href = "/item/" + item.id;
              }}>
              <Avatar
                style={{width: 130, height: 150}}
                variant="square"
                alt={item.name}
                src={"https://ipfs.io/ipfs/"+item.cid}
                className={classes.large}
                key={item.cid}
              />
              </Button>
            ))}
          </Carousel>
          {/* </Paper> */}
          {/* <Paper variant="outlined" className={classes.paper}> */}
          <Carousel
            //enableSwipe={false}
            renderArrow={({ type, onClick, isEdge }) => {
              const pointer =
                type === consts.PREV ? (
                  <KeyboardArrowLeftRoundedIcon
                    style={{
                      fontSize: 50,
                      color: isEdge ? "#343434" : "#00D54B",
                    }}
                  />
                ) : (
                  <KeyboardArrowRightRoundedIcon
                    style={{
                      fontSize: 50,
                      color: isEdge ? "#343434" : "#00D54B",
                    }}
                  />
                );
              return (
                <Button onClick={onClick} disabled={isEdge}>
                  {pointer}
                </Button>
              );
            }}
            enableMouseSwipe={false}
            showArrows={!isThirdPerson ? true : false}
            enableSwipe={!isThirdPerson ? true : false}
            pagination={false}
            initialActiveIndex={
              bottoms.findIndex(
                (item) => profileData.bottom == item.tokenId
              ) !== -1
                ? bottoms.findIndex(
                    (item) => profileData.bottom == item.tokenId
                  ) + 1
                : 0
            }
            onChange={(currentItem, pageIndex) => {
              setSelectedBottomIndex(pageIndex - 1);
            }}
          >
            
            <Avatar
              style={{width: 250, height: 200}}
              variant="square"
              alt="empty"
              src="https://ipfs.io/ipfs/QmRwmAM9rdFm8v9wzajE9jhW2jwQuDeHTMERotWupwzpUP"
              className={classes.large}
              key="gorkem 3"
            />
              
            {bottoms.map((item) => (
              <Button style={{padding:0}}
               onClick={() => {
                window.location.href = "/item/" + item.id;
              }}>
              <Avatar
                style={{width: 250, height: 200}}
                variant="square"
                alt={item.name}
                src={"https://ipfs.io/ipfs/"+item.cid}
                className={classes.large}
                key={item.cid}
              />
              </Button>
            ))}
          </Carousel>
          {/* </Paper> */}
          {!isThirdPerson && (
            <Button
              variant="contained"
              className={classes.myButton}
              style={{ float: "center", marginTop: 20 }}
              onClick={async () => {
                // console.log(selectedHeadIndex);
                // console.log(selectedMiddleIndex);
                // console.log(selectedBottomIndex);

                // console.log("---------");

                // console.log(
                //   selectedHeadIndex === -1 ? 0 : heads[selectedHeadIndex].tokenId
                // );
                // console.log(
                //   selectedMiddleIndex === -1
                //     ? 0
                //     : middles[selectedMiddleIndex].tokenId
                // );
                // console.log(
                //   selectedBottomIndex === -1
                //     ? 0
                //     : bottoms[selectedBottomIndex].tokenId
                // );

                var nft_contract_interface = new window.web3.eth.Contract(
                  NftContract.abi,
                  addresses.NFT_CONTRACTS_ADDRESS
                );
                let myAddress = await window.ethereum.selectedAddress;
                nft_contract_interface.methods
                  .wearItems(
                    selectedHeadIndex === -1
                      ? 0
                      : heads[selectedHeadIndex].tokenId,
                    selectedMiddleIndex === -1
                      ? 0
                      : middles[selectedMiddleIndex].tokenId,
                    selectedBottomIndex === -1
                      ? 0
                      : bottoms[selectedBottomIndex].tokenId
                  )
                  .send({ from: myAddress, gas: 500000 })
                  .on("transactionHash", function (hash) {
                    console.log(hash);
                   // setButtonTrigger(!buttonTrigger);
                  })
                  .on("confirmation", function (confirmationNumber, receipt) {
                    console.log(confirmationNumber, receipt);
                   // setButtonTrigger(!buttonTrigger);
                  })
                  .on("receipt", function (receipt) {
                    // receipt example
                    console.log(receipt);
                    window.location.reload();
                   // setButtonTrigger(!buttonTrigger);
                  })
                  .on("error", async function (error, receipt) {
                    console.log(error, receipt);
                    var error_message = await getRevertReason(receipt.transactionHash, setSnackbarText, setSnackbarController);
                   // setButtonTrigger(!buttonTrigger);
                  });
              }}
            >
              Save
            </Button>
          )}
        </Grid>
      </Grid>
    );
  };

  const FilterItems = () => {
    const [marketIsBiddable, setMarketIsBiddable] = useRecoilState(isBiddable);
    const [marketIsOnSale, setMarketIsOnSale] = useRecoilState(isOnSale);
    const [marketRariryLevel, setMarketRariryLevel] =
      useRecoilState(rarityLevel);
    return (
      <>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="flex-start"
        >
          <Grid item xs={8}>
            <Grid
              container
              direction="column"
              justify="space-around"
              alignItems="flex-start"
            >
              <Grid item>Filter By:</Grid>
              <Grid item>
                <FormGroup row style={{ marginLeft: -16 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={marketIsBiddable}
                        onChange={() => {
                          setMarketIsBiddable(!marketIsBiddable);
                        }}
                        name="Biddable"
                      />
                    }
                    label="Biddable"
                    labelPlacement="start"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={marketIsOnSale}
                        onChange={() => {
                          setMarketIsOnSale(!marketIsOnSale);
                        }}
                        name="Fixed Price"
                      />
                    }
                    label="Fixed Price"
                    labelPlacement="start"
                  />
                  <div
                    style={{ marginTop: 10, marginLeft: 20, marginRight: 10 }}
                  >
                    Rarity:
                  </div>
                  <FormControl>
                    {/* <InputLabel htmlFor="age-native-simple">Rarity</InputLabel> */}
                    <Select
                      style={{ width: 100 }}
                      native
                      value={marketRariryLevel}
                      onChange={(event) => {
                        setMarketRariryLevel(event.target.value);
                      }}
                      inputProps={{
                        name: "age",
                        id: "age-native-simple",
                      }}
                    >
                      <option value={"all"}>All</option>
                      <option value={"legendary"}>Legendary</option>
                      <option value={"epic"}>Epic</option>
                      <option value={"rare"}>Rare</option>
                      <option value={"common"}>Common</option>
                    </Select>
                  </FormControl>
                </FormGroup>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2}>

          </Grid>
        </Grid>
      </>
    );
  };
  const ProfileAllItems = () => {
    const classes = useStyles();

    const allFilteredData = useRecoilValue(getAllItemsFiltered);

    return (
      <Grid
        style={{ marginTop: 30 }}
        container
        direction="row"
        justify="space-around"
        alignItems="flex-start"
      >
        <Grid item xs={12}>
          <FilterItems />
        </Grid>
        <Grid item xs={12} style={{ marginTop: 20 }}>
          <MarketCardList marketCards={allFilteredData} isProfile={true} />
        </Grid>
      </Grid>
    );
  };
  if (isLoading) {
    return (
      <Container className={classes.container} maxWidth="lg">
        Loading
      </Container>
    );
  }
  return (
    <Container className={classes.container} maxWidth="lg">
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
      >
        <Grid
          item
          xs={3}
          style={{ position: "-webkit-sticky", position: "sticky", top: 100 }}
        >
          <ProfileLeftMenu />
        </Grid>
        <Grid item xs={8}>
          <ProfileRightMenu />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
