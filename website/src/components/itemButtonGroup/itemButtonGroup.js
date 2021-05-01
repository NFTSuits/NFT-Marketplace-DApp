import React from "react";
import { makeStyles, Button, TextField } from "@material-ui/core";

const useStyles = makeStyles({
  myButton: {
    color: "#fff",
    backgroundColor: "#000",
  },
});

const ItemButtonGroup = () => {
  const classes = useStyles();
  const isBuyable = true;
  const isBidable = true;
  const isOnSale = true;
  const isOnAuction = true;
  const isThirdPerson = false;

  const buyButton = isBuyable ? (
    <Button className={classes.myButton}>Buy</Button>
  ) : null;

  const bidButton = isBidable ? (
    <>
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <Button>Bid</Button>
    </>
  ) : null;

  const saleButton = isOnSale ? (
    <Button>Cancel Sale</Button>
  ) : (
    <Button>Put On Sale</Button>
  );

  const auctionButton = isOnAuction ? (
    <Button>Cancel Auction</Button>
  ) : (
    <Button>Start an Auction</Button>
  );

  const thridPerson = (
    <>
      {buyButton}
      {bidButton}
    </>
  );

  const firstPerson = (
    <>
      {saleButton}
      {auctionButton}
      <Button>Wear this item</Button>
    </>
  );

  const buttonGroup = isThirdPerson ? thridPerson : firstPerson;

  return buttonGroup;
};

export default ItemButtonGroup;
