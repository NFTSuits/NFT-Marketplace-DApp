import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import TouchRipple from "@material-ui/core/ButtonBase/TouchRipple";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PanToolSharpIcon from "@material-ui/icons/PanToolSharp";
import LocalOfferSharpIcon from "@material-ui/icons/LocalOfferSharp";
import { Grid, Container, Paper } from "@material-ui/core";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";

import NftContract from "../../abis/nft.json";
import addresses from "../../constants/contracts";
import { getUsername } from "../../utils/getUsernameFromAddress";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#080808",
    maxWidth: 300,
    borderRadius: 8,
    color: "#f1ffe3",
    maxHeight: 2000,
    "&:hover": {
      boxShadow:
        "0 1px 3px rgba(255,255,255,0.12), 0 1px 3px rgba(255,255,255,0.24)",
      transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
    },
  },// 70 70, 130 150, 250 200
  mediaTop: {
    height: 70,
    width: 70,
    marginLeft:100,
    borderRadius: 5,
    marginBottom:-5,
    transition: "transform 0.15s ease-in-out",
    "&:hover": {
      transform: "scale3d(1.05, 1.05, 1)",
    },
  },
  mediaMid: {
    height: 150,
    width: 130,
    marginLeft:70,
    borderRadius: 5,
    marginBottom:-5,
    transition: "transform 0.15s ease-in-out",
    "&:hover": {
      transform: "scale3d(1.05, 1.05, 1)",
    },
  },
  mediaBot: {
    height: 240,
    width: 200,
    marginLeft:35,
    borderRadius: 5,
    transition: "transform 0.15s ease-in-out",
    "&:hover": {
      transform: "scale3d(1.05, 1.05, 1)",
    },
  },
  bidPriceInfoContainer: {
    marginLeft: 15,
  },
  myButton: {
    color: "#00D54B",
    backgroundColor: "#080808",
    height: 23,
    position: "relative",
    top: 7,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 12,
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

const AvatarCard = ({
  headImg,
  middleImg,
  bottomImg,
  username,
  address,
}) => {
  const classes = useStyles();
  // var owner = ;

  // const [usernameToBeShown, setUsernameToBeShown] = React.useState(
  //   owner.slice(0, 4) + "..." + owner.slice(owner.length - 2, owner.length)
  // );

  React.useEffect(async () => {
    var nft_contract_interface = new window.web3.eth.Contract(
      NftContract.abi,
      addresses.NFT_CONTRACTS_ADDRESS
    );

    // getUsername(nft_contract_interface, owner).then((data) => {
    //   setUsernameToBeShown(data.username);
    // });
  }, [window.web3.eth]);

  return (
    <Card className={classes.root} variant="outlined">
      <Grid container>
        <Grid item xs>
          <CardActionArea
            disableRipple
            onClick={() => {
              (window.location.href = "profile/" + address);
            }}
          >
            <Grid container>
              <CardMedia
                className={classes.mediaTop}
                // image={imgUrl}
                image={"https://ipfs.io/ipfs/"+ headImg}
                title={'name'}
              />
              <CardMedia
                className={classes.mediaMid}
                // image={imgUrl}
                image={"https://ipfs.io/ipfs/"+ middleImg}
                title={"name"}
              />
              <CardMedia
                className={classes.mediaBot}
                // image={imgUrl}
                image={"https://ipfs.io/ipfs/"+bottomImg}
                title={"name"}
              />
            </Grid>
          </CardActionArea>
          <Grid container style={{ marginTop: 13, marginBottom: 5 }}>
            <div className={classes.bidPriceInfoContainer}>
              <AccountCircleIcon
                style={{
                  verticalAlign: "middle",
                  marginRight: 4,
                  fontSize: 24,
                }}
              />
              <Typography    gutterbottom="true" variant="caption">
                Owner:
              </Typography>
              <Button
                size="small"
                className={classes.myButton}
                onClick={() => {
                  (window.location.href = "profile/" + address);
                }}
              >
                {username}
              </Button>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default AvatarCard;
