import React from "react";
import {
  makeStyles,
  Button,
  TextField,
  Divider,
  createStyles,
} from "@material-ui/core";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { allItems, itemData, myAddress, itemIdAtom } from "../../recoils/atoms";

import addresses from "../../constants/contracts";
import NftContract from "../../abis/nft.json";

const useStyles = makeStyles((theme) =>
  createStyles({
    myButton: {
      color: "#000",
      backgroundColor: "#00D54B",
      height: 42,
      position: "relative",
      top: 7,
      marginRight: 10,
      marginBottom: 10,
      borderRadius: 5,
      border: "1px solid",
      borderColor: "#00D54B",
      "&:hover": {
        backgroundColor: "#121212",
        borderColor: "#00D54B",
        color: "#00D54B",
      },
    },
  })
);

// const useStyles = makeStyles((theme) =>
//   createStyles({
//     container: {
//       padding: theme.spacing(2)
//     },
//   });

/*
bugs:
*/
async function getRevertReason(txHash){
  const tx = await window.web3.eth.getTransaction(txHash)

  console.log( "BLOCK NUMNBEEEEERR", tx.blockNumber)

  var result = await window.web3.eth.call(tx)
  .then((data) => {console.log("DATAAAAA", data)})
  .catch((error) => {
    console.log("ERRORRRRR", error); 
    console.log("MESSAGEEEEEEE", error.message);
    return error.message;
  })

  // console.log( "RESULLLLLTTTT", result)

  result = result.startsWith('0x') ? result : `0x${result}`
  if (result && result.substr(138)) {

    const reason = window.web3.utils.toAscii(result.substr(138))
    console.log('A Revert reason:', reason)
    return reason

  } else {

    console.log('Cannot get reason - No return value')

  }

}

const ItemButtonGroup = (props) => {
  const classes = useStyles();

  const userAddress = useRecoilValue(myAddress);
  const data = useRecoilValue(itemData);
  const id = useRecoilValue(itemIdAtom);

  const [sellPrice, setSellPrice] = React.useState();
  const [bidPrice, setBidPrice] = React.useState();

  const [contractInterface, setContractInterface] = React.useState();

  const isThirdPerson = data.owner.toLowerCase() != userAddress.toLowerCase();

  const isMaxBidder = data.maxBidder.toLowerCase() == userAddress.toLowerCase();

  // console.log("maxBidder", data.maxBidder);
  // console.log("isMaxBidder", isMaxBidder);

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
  }, [window.web3.eth]);

  const handlePutOnSale = () => {
    // console.log("handlePutOnSaleCalled");
    // console.log("contractInterface", contractInterface);
    // console.log("sellPrice", "===>", sellPrice);
    // console.log("tokenId", "===>", parseInt(id) + 1);
    // console.log("data", "===>", data);
    // console.log("price_in_bottons", "===>", sellPrice);

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
        console.log("TRIALLLLLLLLL", receipt.transactionHash)
        getRevertReason(receipt.transactionHash)
      });
  };

  const handleBuy = () => {
    // console.log("handleBuy");
    // console.log("contractInterface", contractInterface);
    // console.log("tokenId", "===>", parseInt(id) + 1);
    // console.log("data", "===>", data);
    // console.log("price_in_bottons", "===>", sellPrice);
    // console.log("price_in_bottons data sell price", "===>", data.sellPrice);

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
    // console.log("handleBuy");
    // console.log("contractInterface", contractInterface);
    // console.log("tokenId", "===>", parseInt(id) + 1);
    // console.log("data", "===>", data);
    // console.log("price_in_bottons", "===>", sellPrice);

    contractInterface.methods
      .cancelSale(parseInt(id) + 1)
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

  const handleBidding = () => {
    contractInterface.methods
      .bid(parseInt(id) + 1)
      .send({ from: userAddress, value: bidPrice, gas: 3000000 })
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

  const handlePutOnAuction = () => {
    contractInterface.methods
      .putOnAuction(parseInt(id) + 1)
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

  const handleCancelAuction = () => {
    contractInterface.methods
      .cancelAuction(parseInt(id) + 1)
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

  const handleAcceptBidding = () => {
    contractInterface.methods
      .acceptHighestBid(parseInt(id) + 1)
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

  const handleWithdrawBid = () => {
    contractInterface.methods
      .withdrawBid(parseInt(id) + 1)
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

  const withdrawBidButton = isMaxBidder ? (
    <Button
      className={classes.myButton}
      onClick={() => {
        handleWithdrawBid();
      }}
    >
      withdraw bid
    </Button>
  ) : null;

  const bidButton = data.isBiddable ? (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
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
            value={bidPrice}
            onChange={(evt) => {
              setBidPrice(evt.target.value);
            }}
          />
          <Button
            className={classes.myButton}
            onClick={() => {
              handleBidding();
            }}
          >
            Bid
          </Button>
        </div>
        {withdrawBidButton}
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
      <Button
        className={classes.myButton}
        onClick={() => {
          handleCancelAuction();
        }}
      >
        Cancel auction
      </Button>
      <Button
        className={classes.myButton}
        onClick={() => {
          handleAcceptBidding();
        }}
      >
        Accept highest bid
      </Button>
    </div>
  ) : (
    <Button
      className={classes.myButton}
      onClick={() => {
        handlePutOnAuction();
      }}
    >
      Start an Auction
    </Button>
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
