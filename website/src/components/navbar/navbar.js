import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import StorefrontIcon from "@material-ui/icons/Storefront";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import LabelIcon from "@material-ui/icons/Label";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import Web3 from "web3";
import addresses from "../../constants/contracts";

import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { getUsername } from "../../recoils/selectors";
import { myUsername, myAddress } from "../../recoils/atoms";

import Username from "../../abis/username.json";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [address, setAddress] = useRecoilState(myAddress);
  const [username, setUsername] = useRecoilState(myUsername);
  const [triggerEth, setTriggerEth] = React.useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  window.ethereum.on("accountsChanged", function (accounts) {
    setAddress("");
    setUsername("");
    setTriggerEth(!triggerEth);
  });

  React.useEffect(async () => {
    try {
      window.web3 = new Web3("http://localhost:8545");
      if (window.ethereum) {
        await window.ethereum.enable(); // pop up
        let myAddress = await window.ethereum.selectedAddress;

        var smart_contract_interface = new window.web3.eth.Contract(
          Username.abi,
          addresses.USERNAME_ADDRESS
        );

        // console.log("methods:", smart_contract_interface.methods);

        smart_contract_interface.methods
          .usernames(myAddress)
          .call()
          .then((data) => {
            // console.log("dataa", data);
            setUsername(data);
          });

        setAddress(myAddress);
      }
    } catch (err) {
      console.log(err);
    }
  }, [triggerEth]);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            CryptoBıdıs
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {/* <div style={{ marginTop: 10 }}>{useRecoilValue(getUsername)}</div> */}

            <Button color="inherit">
              <SupervisedUserCircleIcon
                style={{
                  verticalAlign: "middle",
                  marginRight: 5,
                  fontSize: 20,
                }}
              />
              Avatars
            </Button>
            {/* <Button
              color="inherit"
              onClick={() => {
                window.location.href = "/allItems";
              }}
            >
              <LabelIcon
                style={{
                  verticalAlign: "middle",
                  marginRight: 5,
                  fontSize: 20,
                }}
              />
              All items
            </Button> */}
            <Button
              color="inherit"
              onClick={() => {
                window.location.href = "/marketplace";
              }}
            >
              <StorefrontIcon
                style={{
                  verticalAlign: "middle",
                  marginRight: 5,
                  fontSize: 20,
                }}
              />
              All items{/*Marketplace */}
            </Button>
            {/* {window.ethereum && !window.ethereum.selectedAddress && (
              <>
                <Button
                  onClick={() => {
                    setTriggerEth(!triggerEth);
                  }}
                >
                  Connect
                </Button>
              </>
            )} */}
            {window.ethereum && !window.ethereum.selectedAddress ? (
              <>
                <Button
                  onClick={() => {
                    setTriggerEth(!triggerEth);
                  }}
                >
                  Connect
                </Button>
              </>
            ) : (
              <Button
                color="inherit"
                onClick={() => {
                  window.location.href = "/profile/" + address;
                }}
              >
                <AccountCircle
                  style={{
                    verticalAlign: "middle",
                    marginRight: 5,
                    fontSize: 20,
                  }}
                />
                {/* {address} */}
                {address.slice(0, 6) +
                  "..." +
                  address.slice(address.length - 4, address.length)}
              </Button>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};

export default Navbar;
