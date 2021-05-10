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
} from "@material-ui/core";

import FaceIcon from "@material-ui/icons/Face";

import Carousel from "react-elastic-carousel";
import { withStyles, makeStyles } from "@material-ui/core/styles";

import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";

import { atom, selector, useRecoilState, useRecoilValue } from "recoil";

import { myUsername, myAddress } from "../../recoils/atoms";
import { getUsername } from "../../recoils/selectors";

import MarketCardList from "../../components/marketCard/marketCardList";

const MarketCardData = [
  {
    name: "Card1",
    frequency: "Legendary",
    owner: "Beni",
    imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
    price: "10",
    auctionPrice: "12",
    type: "bean",
  },
  {
    name: "Card2",
    frequency: "Ordinary",
    owner: "Neden",
    imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
    price: "10",
    auctionPrice: "20",
    type: "topWear",
  },
  {
    name: "Card3",
    frequency: "Rare",
    owner: "Yazmadınız",
    imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
    price: "15",
    auctionPrice: "20",
    type: "bottomWear",
  },
  {
    name: "Card1",
    frequency: "Legendary",
    owner: "Beni",
    imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
    price: "10",
    auctionPrice: "12",
    type: "bean",
  },
  {
    name: "Card2",
    frequency: "Ordinary",
    owner: "Sevmiyor",
    imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
    price: "10",
    auctionPrice: "20",
    type: "topWear",
  },
  {
    name: "Card3",
    frequency: "Rare",
    owner: "Musunuz",
    imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
    price: "15",
    auctionPrice: "20",
    type: "bottomWear",
  },
  {
    name: "Card1",
    frequency: "Legendary",
    owner: "Gokberk",
    imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
    price: "10",
    auctionPrice: "12",
    type: "bean",
  },
  {
    name: "Card2",
    frequency: "Ordinary",
    owner: "Kaya",
    imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
    price: "10",
    auctionPrice: "20",
    type: "topWear",
  },
  {
    name: "Card3",
    frequency: "Rare",
    owner: "Musunuz",
    imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
    price: "15",
    auctionPrice: "20",
    type: "bottomWear",
  },
  {
    name: "Card1",
    frequency: "Legendary",
    owner: "Gokberk",
    imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
    price: "10",
    auctionPrice: "12",
    type: "bean",
  },
  {
    name: "Card2",
    frequency: "Ordinary",
    owner: "Kaya",
    imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
    price: "10",
    auctionPrice: "20",
    type: "topWear",
  },
  {
    name: "Card3",
    frequency: "Rare",
    owner: "Cavit",
    imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
    price: "15",
    auctionPrice: "20",
    type: "bottomWear",
  },
  {
    name: "Card1",
    frequency: "Legendary",
    owner: "Beni",
    imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
    price: "10",
    auctionPrice: "12",
    type: "bean",
  },
  {
    name: "Card2",
    frequency: "Ordinary",
    owner: "Neden",
    imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
    price: "10",
    auctionPrice: "20",
    type: "topWear",
  },
  {
    name: "Card3",
    frequency: "Rare",
    owner: "Yazmadınız",
    imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
    price: "15",
    auctionPrice: "20",
    type: "bottomWear",
  },
  {
    name: "Card1",
    frequency: "Legendary",
    owner: "Gokberk",
    imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
    price: "10",
    auctionPrice: "12",
    type: "bean",
  },
  {
    name: "Card2",
    frequency: "Ordinary",
    owner: "Kaya",
    imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
    price: "10",
    auctionPrice: "20",
    type: "topWear",
  },
  {
    name: "Card3",
    frequency: "Rare",
    owner: "Cavit",
    imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
    price: "15",
    auctionPrice: "20",
    type: "bottomWear",
  },
];

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
    color: "black",
    marginBottom: 30,
    textAlign: "center",
    fontWeight: "bold",
  },
  carouselStyle: {
    width: 300,
  },
}));

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

// https://awantoch.medium.com/how-to-connect-web3-js-to-metamask-in-2020-fee2b2edf58a
const Profile = () => {
  const classes = useStyles();
  const [items, setitems] = React.useState([
    { id: 1, title: "item #1" },
    { id: 2, title: "item #2" },
    { id: 3, title: "item #3" },
    { id: 4, title: "item #4" },
    { id: 5, title: "item #5" },
  ]);

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

  const UpperProfile = () => {
    const classes = useStyles();

    const username = useRecoilValue(getUsername);

    return (
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        <Grid className={classes.profileLeft} item xs={4}>
          <Avatar
            alt="Remy Sharp"
            src="https://randomuser.me/api/portraits/lego/5.jpg"
            className={classes.large}
          />
        </Grid>

        <Grid item xs={6}>
          <Typography variant="h5" color="initial">
            @{username}
          </Typography>
        </Grid>
      </Grid>
    );
  };

  const LowerProfile = () => {
    const classes = useStyles();

    return (
      <Grid
        style={{ marginTop: 30 }}
        container
        direction="row"
        justify="space-around"
        alignItems="flex-start"
      >
        <Grid item xs={3}>
          <Typography variant="h5" style={{ color: "grey" }}>
            #Items
          </Typography>

          <Typography variant="h5" className={classes.numberTextStyle}>
            5
          </Typography>
          <Typography variant="h5" style={{ color: "grey" }}>
            #Sold
          </Typography>
          <Typography variant="h5" className={classes.numberTextStyle}>
            7
          </Typography>
          <Typography variant="h5" style={{ color: "grey" }}>
            #Sale
          </Typography>
          <Typography variant="h5" className={classes.numberTextStyle}>
            10
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h5" style={{ color: "grey" }}>
            Spent
          </Typography>
          <Typography variant="h5" className={classes.numberTextStyle}>
            10$
          </Typography>
          <Typography variant="h5" style={{ color: "grey" }}>
            Earned
          </Typography>
          <Typography variant="h5" className={classes.numberTextStyle}>
            15$
          </Typography>
          <Typography variant="h5" style={{ color: "grey" }}>
            #gorkem
          </Typography>
          <Typography variant="h5" className={classes.numberTextStyle}>
            186
          </Typography>
        </Grid>
      </Grid>
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
          backgroundColor: "#919191",
          opacity: 0.15,
        },
      },
    })((props) => (
      <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />
    ));

    const StyledTab = withStyles((theme) => ({
      root: {
        textTransform: "none",
        color: "#5d5d5d",
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
            style={{ width: "%40", maxWidth: "300", borderRadius: 10 }}
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
          <Carousel pagination={false}>
            {items.map((item) => (
              <Avatar
                alt="Remy Sharp"
                src="https://randomuser.me/api/portraits/lego/5.jpg"
                className={classes.large}
                key={item.id}
              />
            ))}
          </Carousel>
          {/* </Paper> */}
          {/* <Paper variant="outlined" className={classes.paper}> */}
          <Carousel pagination={false}>
            {items.map((item) => (
              <Avatar
                alt="Remy Sharp"
                src="https://randomuser.me/api/portraits/lego/5.jpg"
                className={classes.large}
                key={item.id}
              />
            ))}
          </Carousel>
          {/* </Paper> */}
          {/* <Paper variant="outlined" className={classes.paper}> */}
          <Carousel pagination={false}>
            {items.map((item) => (
              <Avatar
                alt="Remy Sharp"
                src="https://randomuser.me/api/portraits/lego/5.jpg"
                className={classes.large}
                key={item.id}
              />
            ))}
          </Carousel>
          {/* </Paper> */}
          <Button
            variant="contained"
            color="primary"
            style={{ float: "center", marginTop: 20 }}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    );
  };
  const FilterItems = () => {
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
                        // checked={state.checkedA}
                        // onChange={handleChange}
                        name="Biddable"
                      />
                    }
                    label="Biddable"
                    labelPlacement="start"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        // checked={state.checkedB}
                        // onChange={handleChange}
                        name="Fixed Price"
                        color="primary"
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
                      // value={state.age}
                      // onChange={handleChange}
                      inputProps={{
                        name: "age",
                        id: "age-native-simple",
                      }}
                    >
                      <option value={10}>All</option>
                      <option value={10}>Legendary</option>
                      <option value={10}>Epic</option>
                      <option value={20}>Rare</option>
                      <option value={30}>Common</option>
                    </Select>
                  </FormControl>
                </FormGroup>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Grid
              container
              direction="column"
              justify="space-around"
              alignItems="flex-start"
            >
              <Grid>Sort By:</Grid>
              <Grid>
                <FormControl>
                  {/* <InputLabel htmlFor="age-native-simple">Age</InputLabel> */}
                  <Select
                    style={{ width: 150 }}
                    native
                    // value={state.age}
                    // onChange={handleChange}
                    inputProps={{
                      name: "age",
                      id: "age-native-simple",
                    }}
                  >
                    <option value={10}>Ten</option>
                    <option value={20}>Twenty</option>
                    <option value={30}>Thirty</option>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  };
  const ProfileAllItems = () => {
    const classes = useStyles();

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
          <MarketCardList marketCards={MarketCardData} />
        </Grid>
      </Grid>
    );
  };

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
