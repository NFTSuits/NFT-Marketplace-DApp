import React from "react";
import { Typography, Paper, Tabs, Tab, AppBar, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PhoneIcon from "@material-ui/icons/Phone";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import HelpIcon from "@material-ui/icons/Help";
import ShoppingBasket from "@material-ui/icons/ShoppingBasket";
import ThumbDown from "@material-ui/icons/ThumbDown";
import ThumbUp from "@material-ui/icons/ThumbUp";
import PropTypes from "prop-types";

import MarketCardList from "./marketCardList";
const MarketCardData = [
  {
    name: "Card1",
    owner: "Gokberk",
    imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
    price: "10",
    auctionPrice: "12",
  },
  {
    name: "Card2",
    owner: "Kaya",
    imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
    price: "10",
    auctionPrice: "20",
  },
  {
    name: "Card3",
    owner: "Cavit",
    imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
    price: "15",
    auctionPrice: "20",
  },
  {
    name: "Card1",
    owner: "Gokberk",
    imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
    price: "10",
    auctionPrice: "12",
  },
  {
    name: "Card2",
    owner: "Kaya",
    imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
    price: "10",
    auctionPrice: "20",
  },
  {
    name: "Card3",
    owner: "Cavit",
    imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
    price: "15",
    auctionPrice: "20",
  },
  {
    name: "Card1",
    owner: "Gokberk",
    imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
    price: "10",
    auctionPrice: "12",
  },
  {
    name: "Card2",
    owner: "Kaya",
    imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
    price: "10",
    auctionPrice: "20",
  },
  {
    name: "Card3",
    owner: "Cavit",
    imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
    price: "15",
    auctionPrice: "20",
  },
  {
    name: "Card1",
    owner: "Gokberk",
    imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
    price: "10",
    auctionPrice: "12",
  },
  {
    name: "Card2",
    owner: "Kaya",
    imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
    price: "10",
    auctionPrice: "20",
  },
  {
    name: "Card3",
    owner: "Cavit",
    imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
    price: "15",
    auctionPrice: "20",
  },
  {
    name: "Card1",
    owner: "Gokberk",
    imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
    price: "10",
    auctionPrice: "12",
  },
  {
    name: "Card2",
    owner: "Kaya",
    imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
    price: "10",
    auctionPrice: "20",
  },
  {
    name: "Card3",
    owner: "Cavit",
    imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
    price: "15",
    auctionPrice: "20",
  },
  {
    name: "Card1",
    owner: "Gokberk",
    imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
    price: "10",
    auctionPrice: "12",
  },
  {
    name: "Card2",
    owner: "Kaya",
    imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
    price: "10",
    auctionPrice: "20",
  },
  {
    name: "Card3",
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
        style={{ width: "%40", minWidth: "300" }}
        position="static"
        color="default"
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab label="Item One" icon={<PhoneIcon />} {...a11yProps(0)} />
          <Tab label="Item Two" icon={<FavoriteIcon />} {...a11yProps(1)} />
          <Tab label="Item Three" icon={<PersonPinIcon />} {...a11yProps(2)} />
        </Tabs>
      </AppBar>
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
