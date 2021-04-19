import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 180,
    width: 180,
  },
});

const MarketCard = ({ name, owner, imgUrl, price, auctionPrice }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={imgUrl} title={name} />
        <CardContent>
          <Typography gutterBottom variant="h7" component="h1">
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Typography gutterBottom variant="caption" component="h2">
          Owner:
        </Typography>
        <Button size="small" color="primary">
          {owner}
        </Button>
      </CardActions>
      <CardActions>
        <Typography gutterBottom variant="subtitle2" component="h2">
          Price:
        </Typography>
        <Button size="small" color="primary">
          {price}
        </Button>
        <Typography gutterBottom variant="subtitle2" component="h2">
          Auction:
        </Typography>

        <Button size="small" color="primary">
          {auctionPrice}
        </Button>
      </CardActions>
    </Card>
  );
};

export default MarketCard;
