import React from "react";
import { makeStyles, Button, TextField, Divider } from "@material-ui/core";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { allItems, itemData, myAddress } from "../../recoils/atoms";

const useStyles = makeStyles({
  myButton: {
    color: "#3F51B5",
    backgroundColor: "#fff",
    height: 42,
    position: "relative",
    top: 7,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 5,
    border: "1px solid",
    borderColor: "#3F51B5",
    "&:hover": {
      backgroundColor: "#3F51B5",
      borderColor: "#3F51B5",
      color: "#fff",
    },
  },
});

/*
bugs:
*/

const ItemButtonGroup = () => {
  const classes = useStyles();

  const alreadyWearing = false; // düzeltilmeli

  const addr = useRecoilValue(myAddress);
  const data = useRecoilValue(itemData);

  const isThirdPerson = data.owner.toLowerCase() != addr.toLowerCase();

  const buyButton = data.isOnSale ? (
    <Button className={classes.myButton}>Buy</Button>
  ) : null;

  const bidButton = data.isBiddable ? (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TextField
          label="Bid amount"
          id="outlined-margin-none"
          className={classes.textField}
          margin="dense"
          helperText="Must enter a bid value"
          variant="outlined"
        />
        <Button className={classes.myButton}>Bid</Button>
      </div>
    </>
  ) : null;

  const saleButton = data.isOnSale ? (
    <Button className={classes.myButton}>Cancel Sale</Button>
  ) : (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <TextField
        label="Price"
        id="outlined-margin-none"
        className={classes.textField}
        margin="dense"
        helperText="Must fix a price"
        variant="outlined"
      />
      <Button className={classes.myButton}>Put on sale</Button>
    </div>
  );

  const auctionButton = data.isBiddable ? (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <Button className={classes.myButton}>Cancel auction</Button>
      <Button className={classes.myButton}>Accept highest bid</Button>
    </div>
  ) : (
    <Button className={classes.myButton}>Start an Auction</Button>
  );

  const isDivider = // KULLANILMIYO 🐥🐥🐥🐥🐥🐥🐥
    data.isBiddable && data.isOnSale ? (
      <Divider
        orientation="vertical"
        flexItem
        style={{ height: 55, marginRight: 10 }}
      />
    ) : null;

  const wearButton = !alreadyWearing ? (
    <Button className={classes.myButton}>Wear this item</Button>
  ) : null;
  const thridPerson = (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {bidButton}
        {buyButton}
      </div>
    </>
  );

  const firstPerson = (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {wearButton}
        {auctionButton}
        {saleButton}
      </div>
    </>
  );

  const buttonGroup = isThirdPerson ? thridPerson : firstPerson;

  return buttonGroup;
};

export default ItemButtonGroup;
