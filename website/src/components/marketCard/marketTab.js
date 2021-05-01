import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import FaceIcon from "@material-ui/icons/Face";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";
import PropTypes from "prop-types";

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
} from "@material-ui/core";

import MarketCardList from "./marketCardList";
const MarketCardData = [
  {
    name: "Card1",
    frequency: "Legendary",
    owner: "Beni",
    imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
    price: "10",
    auctionPrice: "12",
  },
  {
    name: "Card2",
    frequency: "Ordinary",
    owner: "Neden",
    imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
    price: "10",
    auctionPrice: "20",
  },
  {
    name: "Card3",
    frequency: "Rare",
    owner: "Yazmadınız",
    imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
    price: "15",
    auctionPrice: "20",
  },
  {
    name: "Card1",
    frequency: "Legendary",
    owner: "Beni",
    imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
    price: "10",
    auctionPrice: "12",
  },
  {
    name: "Card2",
    frequency: "Ordinary",
    owner: "Sevmiyor",
    imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
    price: "10",
    auctionPrice: "20",
  },
  {
    name: "Card3",
    frequency: "Rare",
    owner: "Musunuz",
    imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
    price: "15",
    auctionPrice: "20",
  },
  {
    name: "Card1",
    frequency: "Legendary",
    owner: "Gokberk",
    imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
    price: "10",
    auctionPrice: "12",
  },
  {
    name: "Card2",
    frequency: "Ordinary",
    owner: "Kaya",
    imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
    price: "10",
    auctionPrice: "20",
  },
  {
    name: "Card3",
    frequency: "Rare",
    owner: "Musunuz",
    imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
    price: "15",
    auctionPrice: "20",
  },
  {
    name: "Card1",
    frequency: "Legendary",
    owner: "Gokberk",
    imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
    price: "10",
    auctionPrice: "12",
  },
  {
    name: "Card2",
    frequency: "Ordinary",
    owner: "Kaya",
    imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
    price: "10",
    auctionPrice: "20",
  },
  {
    name: "Card3",
    frequency: "Rare",
    owner: "Cavit",
    imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
    price: "15",
    auctionPrice: "20",
  },
  {
    name: "Card1",
    frequency: "Legendary",
    owner: "Beni",
    imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
    price: "10",
    auctionPrice: "12",
  },
  {
    name: "Card2",
    frequency: "Ordinary",
    owner: "Neden",
    imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
    price: "10",
    auctionPrice: "20",
  },
  {
    name: "Card3",
    frequency: "Rare",
    owner: "Yazmadınız",
    imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
    price: "15",
    auctionPrice: "20",
  },
  {
    name: "Card1",
    frequency: "Legendary",
    owner: "Gokberk",
    imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
    price: "10",
    auctionPrice: "12",
  },
  {
    name: "Card2",
    frequency: "Ordinary",
    owner: "Kaya",
    imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
    price: "10",
    auctionPrice: "20",
  },
  {
    name: "Card3",
    frequency: "Rare",
    owner: "Cavit",
    imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
    price: "15",
    auctionPrice: "20",
  },
];

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
      <div>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="flex-start"
        >
          <Grid item xs={4}>
            deneme
          </Grid>
          <Grid item xs={4}>
            deneme
          </Grid>
        </Grid>
      </div>
      <TabPanel value={value} index={0}>
        <MarketCardList marketCards={MarketCardData} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MarketCardList marketCards={MarketCardData} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <MarketCardList marketCards={MarketCardData} />
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
