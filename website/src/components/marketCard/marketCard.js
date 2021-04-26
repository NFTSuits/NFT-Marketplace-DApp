import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Grid, Container, Paper } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    borderRadius: 8,
    color: "#444",
    backgroundColor: "#e7e7e7",
    maxHeight: 395,
  },
  media: {
    height: 220,
    width: "100%",
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
}) => {
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <div>
        <CardActionArea
          onClick={() => {
            console.log("elma");
          }}
        >
          <Grid container direction="column">
            <Grid item xs={12}>
              <CardMedia
                className={classes.media}
                image={imgUrl}
                title={name}
              />
            </Grid>
            <Grid item xs={3}>
              <CardContent>
                <Typography variant="caption">{frequency}</Typography>
                <Typography gutterBottom variant="h7" component="h1">
                  {name}
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </CardActionArea>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          className={classes.bidPriceInfoContainer}
          // style={{ marginTop: -20 }}
        >
          <AccountCircleIcon
            style={{ verticalAlign: "middle", marginRight: 8 }}
          />
          <Typography gutterBottom variant="caption">
            Owner:
          </Typography>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              console.log("owner");
            }}
          >
            {owner}
          </Button>
        </div>
        <div className={classes.bidPriceInfoContainer}>
          <Typography gutterBottom variant="caption">
            Bid: {auctionPrice}
          </Typography>
        </div>
        <div
          className={classes.bidPriceInfoContainer}
          style={{ marginBottom: 10 }}
        >
          <Typography gutterBottom variant="caption">
            Price: {price}
          </Typography>
        </div>
      </div>
    </Card>
  );
};

export default MarketCard;
