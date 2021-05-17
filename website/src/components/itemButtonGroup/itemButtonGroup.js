import React from "react";
import { makeStyles, Button, TextField, Divider } from "@material-ui/core";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { allItems, itemData, myAddress, itemIdAtom } from "../../recoils/atoms";

import addresses from "../../constants/contracts";
import NftContract from "../../abis/nft.json";

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

const ItemButtonGroup = (props) => {
  const classes = useStyles();

  const userAddress = useRecoilValue(myAddress);
  const data = useRecoilValue(itemData);
  const id = useRecoilValue(itemIdAtom);

  const [sellPrice, setSellPrice] = React.useState(0);

  const [contractInterface, setContractInterface] = React.useState();

  const isThirdPerson = data.owner.toLowerCase() != userAddress.toLowerCase();

  const buyButton = data.isOnSale ? (
    <Button className={classes.myButton} onClick={() => handleBuy()}>
      Buy
    </Button>
  ) : null;

  React.useEffect(() => {
    var nft_contract_interface = new window.web3.eth.Contract(
      NftContract.abi,
      addresses.NFT_CONTRACTS_ADDRESS
    );
    setContractInterface(nft_contract_interface);
  }, []);

  const handlePutOnSale = () => {
    console.log("handlePutOnSaleCalled");
    console.log("contractInterface", contractInterface);
    console.log("sellPrice", "===>", sellPrice);
    console.log("tokenId", "===>", parseInt(id) + 1);
    console.log("data", "===>", data);
    console.log("price_in_bottons", "===>", sellPrice);

    contractInterface.methods
      .putOnSale(parseInt(id) + 1, sellPrice)
      .send({ from: userAddress, gas: 500000 })
      .on("transactionHash", function (hash) {
        console.log(hash);
      })
      .on("confirmation", function (confirmationNumber, receipt) {
        console.log(confirmationNumber, receipt);
      })
      .on("receipt", async function (receipt) {
        // receipt example
        console.log(receipt);
      })
      .on("error", function (error, receipt) {
        console.log(error, receipt);
      });
  };

  const handleBuy = () => {
    console.log("handleBuy");
    console.log("contractInterface", contractInterface);
    console.log("tokenId", "===>", parseInt(id) + 1);
    console.log("data", "===>", data);
    console.log("price_in_bottons", "===>", sellPrice);
    console.log("price_in_bottons data sell price", "===>", data.sellPrice);

    contractInterface.methods
      .buyFromSale(parseInt(id) + 1)
      .send({ from: userAddress, value: data.sellPrice, gas: 3000000 })
      .on("transactionHash", function (hash) {
        console.log(hash);
      })
      .on("confirmation", function (confirmationNumber, receipt) {
        console.log(confirmationNumber, receipt);
      })
      .on("receipt", async function (receipt) {
        // receipt example
        console.log(receipt);
      })
      .on("error", function (error, receipt) {
        console.log(receipt);
        console.log(error, receipt);

        console.log(error.data);
      });
  };

  const handleCancelSale = () => {
    console.log("handleBuy");
    console.log("contractInterface", contractInterface);
    console.log("tokenId", "===>", parseInt(id) + 1);
    console.log("data", "===>", data);
    console.log("price_in_bottons", "===>", sellPrice);

    contractInterface.methods
      .cancelSale(parseInt(id) + 1)
      .send({ from: userAddress })
      .on("transactionHash", function (hash) {
        console.log(hash);
      })
      .on("confirmation", function (confirmationNumber, receipt) {
        console.log(confirmationNumber, receipt);
      })
      .on("receipt", async function (receipt) {
        // receipt example
        console.log(receipt);
      })
      .on("error", function (error, receipt) {
        console.log(error, receipt);
      });
  };

  const handleWear = () => {
    contractInterface.methods
      .wearItem(parseInt(id) + 1)
      .send({ from: userAddress })
      .on("transactionHash", function (hash) {
        console.log(hash);
      })
      .on("confirmation", function (confirmationNumber, receipt) {
        console.log(confirmationNumber, receipt);
      })
      .on("receipt", async function (receipt) {
        // receipt example
        console.log(receipt);
      })
      .on("error", function (error, receipt) {
        console.log(error, receipt);
      });
  };

  const handleUnwear = () => {
    contractInterface.methods
      .unWearItem(parseInt(data.clothType))
      .send({ from: userAddress })
      .on("transactionHash", function (hash) {
        console.log(hash);
      })
      .on("confirmation", function (confirmationNumber, receipt) {
        console.log(confirmationNumber, receipt);
      })
      .on("receipt", async function (receipt) {
        // receipt example
        console.log(receipt);
      })
      .on("error", function (error, receipt) {
        console.log(error, receipt);
      });
  };

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
    <Button
      className={classes.myButton}
      onClick={() => {
        handleCancelSale();
      }}
    >
      Cancel Sale
    </Button>
  ) : (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <TextField
        value={sellPrice}
        onChange={(evt) => {
          setSellPrice(evt.target.value);
        }}
        label="Price"
        id="outlined-margin-none"
        className={classes.textField}
        margin="dense"
        helperText="Must fix a price"
        variant="outlined"
      />
      <Button className={classes.myButton} onClick={() => handlePutOnSale()}>
        Put on sale
      </Button>
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

  const wearButton = !data.isWearing ? (
    <Button
      className={classes.myButton}
      onClick={() => {
        handleWear();
      }}
    >
      Wear this item
    </Button>
  ) : (
    <Button
      className={classes.myButton}
      onClick={() => {
        handleUnwear();
      }}
    >
      Unwear this item
    </Button>
  );
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
