import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import TouchRipple from "@material-ui/core/ButtonBase/TouchRipple";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PanToolSharpIcon from "@material-ui/icons/PanToolSharp";
import LocalOfferSharpIcon from "@material-ui/icons/LocalOfferSharp";
import { Grid, Container, Paper } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    borderRadius: 8,
    color: "#444",
    maxHeight: 395,
    "&:hover": {
      boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.24)",
      transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
    },
  },
  media: {
    height: 220,
    width: "100%",
    borderRadius: 5,
    transition: "transform 0.15s ease-in-out",
    "&:hover": {
      transform: "scale3d(1.05, 1.05, 1)",
    },
  },
  bidPriceInfoContainer: {
    marginLeft: 15,
  },
});

const MarketCard = ({
  name,
  frequency,
  owner,
  imgUrl,
  price,
  auctionPrice,
  type,
  isBiddable,
  isOnSale,
  id,
}) => {
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <Grid container>
        <Grid item xs>
          <CardActionArea
            disableRipple
            onClick={() => {
              window.location.href = "/item/" + id;
            }}
          >
            <Grid container>
              <CardMedia
                className={classes.media}
                image={imgUrl}
                title={name}
              />
            </Grid>
            <Grid container direction="column" style={{ marginTop: 15 }}>
              <Grid item style={{ marginLeft: 15, marginBottom: 6 }}>
                <Typography variant="caption">{frequency}</Typography>
                <Typography gutterBottom variant="h6" component="h1">
                  {name}
                </Typography>
              </Grid>
              <Grid item style={{ alignSelf: "flex-start", marginLeft: 15 }}>
                <div style={{ textAlign: "left" }}>
                  <div>
                    <LocalOfferSharpIcon
                      style={{
                        verticalAlign: "middle",
                        marginRight: 5,
                        fontSize: 20,
                      }}
                    />

                    <Typography variant="caption">
                      Price: {isOnSale ? "Ξ " + price : "-"}
                    </Typography>
                  </div>
                </div>
                <div style={{ marginTop: 7, textAlign: "left" }}>
                  <div>
                    <PanToolSharpIcon
                      style={{
                        verticalAlign: "middle",
                        marginRight: 5,
                        fontSize: 20,
                      }}
                    />
                    <Typography variant="caption">
                      Highest bid: {isBiddable ? "Ξ " + auctionPrice : "-"}
                    </Typography>
                  </div>
                </div>
              </Grid>
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
              <Typography gutterBottom variant="caption">
                Owner:
              </Typography>
              <Button
                size="small"
                color="primary"
                onClick={() => {
                  window.location.href = "profile/" + owner;
                }}
              >
                {owner.slice(0, 6) +
                  "..." +
                  owner.slice(owner.length - 4, owner.length)}
              </Button>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default MarketCard;
