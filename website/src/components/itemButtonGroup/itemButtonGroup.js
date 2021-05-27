import React from "react";
import {
  makeStyles,
  Button,
  TextField,
  Divider,
  createStyles,
} from "@material-ui/core";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { allItems, itemData, myAddress, itemIdAtom,  snackbarTextAtom, snackbarControllerAtom } from "../../recoils/atoms";

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
async function getRevertReason(txHash, setSnackbarText, setSnackbarController) {
  const tx = await window.web3.eth.getTransaction(txHash)

  var result = await window.web3.eth.call(tx)
  .then((data) => {console.log("DATAAAAA", data)})
  .catch((error) => {
    var index = error.message.indexOf("{");
    return JSON.parse(error.message.substring(index).trim()).originalError.message;
  })
  setSnackbarController(true);
  setSnackbarText(result);
  return result;
}

const ItemButtonGroup = (props) => {
  const classes = useStyles();

  const regex = /^([0-9]+(\.[0-9]+)?)$/g;

  const userAddress = useRecoilValue(myAddress);
  const data = useRecoilValue(itemData);
  const id = useRecoilValue(itemIdAtom);

  const [snackbarText, setSnackbarText] = useRecoilState(snackbarTextAtom);
  const [snackbarController, setSnackbarController] = useRecoilState(snackbarControllerAtom);

  const [sellPrice, setSellPrice] = React.useState();
  const [bidPrice, setBidPrice] = React.useState();

  const [contractInterface, setContractInterface] = React.useState();


  const [bidTextFieldError, setBidTextFieldError] = React.useState(false);
  const [putOnSaleTextFieldError, setPutOnSaleTextFieldError] = React.useState(false);

  const isThirdPerson = data.owner.toLowerCase() != userAddress.toLowerCase();

  const isMaxBidder = data.maxBidder.toLowerCase() == userAddress.toLowerCase();


  const [buttonTrigger, setButtonTrigger] = React.useState(false);
  

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
  }, [window.web3.eth,buttonTrigger]);

  const handlePutOnSale = () => {
    // console.log("handlePutOnSaleCalled");
    // console.log("contractInterface", contractInterface);
    // console.log("sellPrice", "===>", sellPrice);
    // console.log("tokenId", "===>", parseInt(id) + 1);
    // console.log("data", "===>", data);
    // console.log("price_in_bottons", "===>", sellPrice);

    contractInterface.methods
      .putOnSale(parseInt(id) + 1, window.web3.utils.toWei(sellPrice))
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
       // setButtonTrigger(!buttonTrigger);
      //  window.location.reload();
      })
      .on("error", async function (error, receipt) {
        console.log(error, receipt);
        var error_message = await getRevertReason(receipt.transactionHash, setSnackbarText, setSnackbarController);
        //alert(error_message)
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
        // window.location.reload();
       // setButtonTrigger(!buttonTrigger);
      })
      .on("error", async function (error, receipt) {
        console.log(receipt);
        console.log(error, receipt);
        var error_message = await getRevertReason(receipt.transactionHash, setSnackbarText, setSnackbarController);

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
       // setButtonTrigger(!buttonTrigger);
        console.log(receipt);
        // window.location.reload();
      })
      .on("error", async function (error, receipt) {
        console.log(error, receipt);
        var error_message = await getRevertReason(receipt.transactionHash, setSnackbarText, setSnackbarController);
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
       // setButtonTrigger(!buttonTrigger);
        console.log(receipt);
        window.location.reload();
      })
      .on("error", async function (error, receipt) {
        console.log(error, receipt);
        var error_message = await getRevertReason(receipt.transactionHash, setSnackbarText, setSnackbarController);
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
       // setButtonTrigger(!buttonTrigger);
        console.log(receipt);
        window.location.reload();
      })
      .on("error", async function (error, receipt) {
        console.log(error, receipt);
        var error_message = await getRevertReason(receipt.transactionHash, setSnackbarText, setSnackbarController);
      });
  };

  const handleBidding = () => {
    contractInterface.methods
      .bid(parseInt(id) + 1)
      .send({ from: userAddress, value: window.web3.utils.toWei(bidPrice), gas: 3000000 })
      .on("transactionHash", function (hash) {
        console.log(hash);
      })
      .on("confirmation", function (confirmationNumber, receipt) {
        console.log(confirmationNumber, receipt);
      })
      .on("receipt", async function (receipt) {
       // setButtonTrigger(!buttonTrigger);
        // receipt example
        console.log(receipt);
        // window.location.reload();
      })
      .on("error", async function (error, receipt) {
        console.log(error, receipt);
        var error_message = await getRevertReason(receipt.transactionHash, setSnackbarText, setSnackbarController);
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
       // setButtonTrigger(!buttonTrigger);
        // receipt example
        console.log(receipt);
        // window.location.reload();
      })
      .on("error", async function (error, receipt) {
        console.log(error, receipt);
        var error_message = await getRevertReason(receipt.transactionHash, setSnackbarText, setSnackbarController);
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
       // setButtonTrigger(!buttonTrigger);
        console.log(receipt);
        // window.location.reload();
      })
      .on("error", async function (error, receipt) {
        console.log(error, receipt);
        var error_message = await getRevertReason(receipt.transactionHash, setSnackbarText, setSnackbarController);
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
       // setButtonTrigger(!buttonTrigger);
        console.log(receipt);
        // window.location.reload();
      })
      .on("error", async function (error, receipt) {
        console.log(error, receipt);
        var error_message = await getRevertReason(receipt.transactionHash, setSnackbarText, setSnackbarController);
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
       // setButtonTrigger(!buttonTrigger);
        // receipt example
        console.log(receipt);
        // window.location.reload();
      })
      .on("error", async function (error, receipt) {
        console.log(error, receipt);
        var error_message = await getRevertReason(receipt.transactionHash, setSnackbarText, setSnackbarController);
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
            error={bidTextFieldError}
            helperText="You need to give a valid amount."
            label="Bid amount"
            id="outlined-margin-none"
            className={classes.textField}
            margin="dense"
            variant="outlined"
            value={bidPrice}
            onChange={(evt) => {
              if(evt.target.value.toString().match(regex)) {
                setBidTextFieldError(false);
              }
              else {
                setBidTextFieldError(true);
              }
              setBidPrice(evt.target.value);
            }}
          />
          <Button
            disabled={bidTextFieldError || bidPrice == null}
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
        error={putOnSaleTextFieldError}
        helperText="You need to give a valid amount."
        value={sellPrice}
        onChange={(evt) => {
          if(evt.target.value.toString().match(regex)) {
            setPutOnSaleTextFieldError(false);
          }
          else {
            setPutOnSaleTextFieldError(true);
          }
          setSellPrice(evt.target.value);
        }}
        label="Price"
        id="outlined-margin-none"
        className={classes.textField}
        margin="dense"
        variant="outlined"
      />
      <Button disabled={putOnSaleTextFieldError} className={classes.myButton} onClick={() => handlePutOnSale()}>
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
