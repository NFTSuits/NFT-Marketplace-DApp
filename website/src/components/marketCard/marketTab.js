import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import FaceIcon from "@material-ui/icons/Face";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";
import PropTypes from "prop-types";

import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import {
  getUsername,
  getHeads,
  getMiddles,
  getBottoms,
} from "../../recoils/selectors";
import { myUsername, myAddress, allItems } from "../../recoils/atoms";

import {
  Typography,
  Tabs,
  Tab,
  AppBar,
  Box,
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
  IconButton,
  Switch,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import MarketCardList from "./marketCardList";
// const MarketCardData = [
//   {
//     name: "Card1",
//     frequency: "Legendary",
//     owner: "Beni",
//     imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
//     price: "10",
//     auctionPrice: "12",
//     type: "bean",
//   },
//   {
//     name: "Card2",
//     frequency: "Ordinary",
//     owner: "Neden",
//     imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
//     price: "10",
//     auctionPrice: "20",
//     type: "topWear",
//   },
//   {
//     name: "Card3",
//     frequency: "Rare",
//     owner: "Yazmadınız",
//     imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
//     price: "15",
//     auctionPrice: "20",
//     type: "bottomWear",
//   },
//   {
//     name: "Card1",
//     frequency: "Legendary",
//     owner: "Beni",
//     imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
//     price: "10",
//     auctionPrice: "12",
//     type: "bean",
//   },
//   {
//     name: "Card2",
//     frequency: "Ordinary",
//     owner: "Sevmiyor",
//     imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
//     price: "10",
//     auctionPrice: "20",
//     type: "topWear",
//   },
//   {
//     name: "Card3",
//     frequency: "Rare",
//     owner: "Musunuz",
//     imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
//     price: "15",
//     auctionPrice: "20",
//     type: "bottomWear",
//   },
//   {
//     name: "Card1",
//     frequency: "Legendary",
//     owner: "Gokberk",
//     imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
//     price: "10",
//     auctionPrice: "12",
//     type: "bean",
//   },
//   {
//     name: "Card2",
//     frequency: "Ordinary",
//     owner: "Kaya",
//     imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
//     price: "10",
//     auctionPrice: "20",
//     type: "topWear",
//   },
//   {
//     name: "Card3",
//     frequency: "Rare",
//     owner: "Musunuz",
//     imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
//     price: "15",
//     auctionPrice: "20",
//     type: "bottomWear",
//   },
//   {
//     name: "Card1",
//     frequency: "Legendary",
//     owner: "Gokberk",
//     imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
//     price: "10",
//     auctionPrice: "12",
//     type: "bean",
//   },
//   {
//     name: "Card2",
//     frequency: "Ordinary",
//     owner: "Kaya",
//     imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
//     price: "10",
//     auctionPrice: "20",
//     type: "topWear",
//   },
//   {
//     name: "Card3",
//     frequency: "Rare",
//     owner: "Cavit",
//     imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
//     price: "15",
//     auctionPrice: "20",
//     type: "bottomWear",
//   },
//   {
//     name: "Card1",
//     frequency: "Legendary",
//     owner: "Beni",
//     imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
//     price: "10",
//     auctionPrice: "12",
//     type: "bean",
//   },
//   {
//     name: "Card2",
//     frequency: "Ordinary",
//     owner: "Neden",
//     imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
//     price: "10",
//     auctionPrice: "20",
//     type: "topWear",
//   },
//   {
//     name: "Card3",
//     frequency: "Rare",
//     owner: "Yazmadınız",
//     imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
//     price: "15",
//     auctionPrice: "20",
//     type: "bottomWear",
//   },
//   {
//     name: "Card1",
//     frequency: "Legendary",
//     owner: "Gokberk",
//     imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
//     price: "10",
//     auctionPrice: "12",
//     type: "bean",
//   },
//   {
//     name: "Card2",
//     frequency: "Ordinary",
//     owner: "Kaya",
//     imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
//     price: "10",
//     auctionPrice: "20",
//     type: "topWear",
//   },
//   {
//     name: "Card3",
//     frequency: "Rare",
//     owner: "Cavit",
//     imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
//     price: "15",
//     auctionPrice: "20",
//     type: "bottomWear",
//   },
// ];

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

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
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

const MarketTab = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const items = useRecoilValue(allItems);
  const heads = useRecoilValue(getHeads);
  const middles = useRecoilValue(getMiddles);
  const bottoms = useRecoilValue(getBottoms);

  console.log("allItems", items);
  console.log("heads", heads);
  console.log("middles", middles);
  console.log("bottoms", bottoms);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
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
                <FaceIcon style={{ verticalAlign: "middle", marginRight: 8 }} />{" "}
                Bean{" "}
              </div>
            }
            {...a11yProps(0)}
          />
          <StyledTab
            label={
              <div>
                <AccessibilityNewIcon
                  style={{ verticalAlign: "middle", marginRight: 8 }}
                />{" "}
                Top Wear{" "}
              </div>
            }
            {...a11yProps(0)}
          />
          <StyledTab
            label={
              <div>
                <AccessibilityNewIcon
                  style={{ verticalAlign: "middle", marginRight: 8 }}
                />{" "}
                Bottom Wear{" "}
              </div>
            }
            {...a11yProps(0)}
          />
        </StyledTabs>
      </AppBar>
      <div style={{ marginTop: 20, marginLeft: 45, marginRight: 60 }}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="flex-start"
        >
          <Grid item xs={10}>
            <Grid
              container
              direction="column"
              justify="space-between"
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
              justify="space-between"
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
      </div>
      <TabPanel value={value} index={0}>
        <MarketCardList marketCards={heads} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MarketCardList marketCards={middles} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <MarketCardList marketCards={bottoms} />
      </TabPanel>
    </div>
  );
  return;
};

export default MarketTab;

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
