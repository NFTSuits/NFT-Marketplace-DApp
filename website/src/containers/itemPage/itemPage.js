import React from "react";
import {
  makeStyles,
  Button,
  Grid,
  Container,
  Paper,
  Table,
  TableRow,
  TableCell,
  TableContainer,
  TableHead,
  TableBody,
  Typography,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PanToolSharpIcon from "@material-ui/icons/PanToolSharp";
import LocalOfferSharpIcon from "@material-ui/icons/LocalOfferSharp";
import StarsIcon from "@material-ui/icons/Stars";
import DnsIcon from "@material-ui/icons/Dns";
import ItemButtonGroup from "../../components/itemButtonGroup/itemButtonGroup";

{
  /* <div
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}
>
  Hello world
</div>; */
}
const MarketCardData = {
  name: "Kol",
  rarity: "Legendary",
  owner: "Cavit",
  imgUrl: "https://sc04.alicdn.com/kf/Uf4c62ba9db5c4371a07c52c140f7054cG.jpg",
  price: "10",
  auctionPrice: "12",
};
const isThirdPerson = true;

const ItemPage = () => {
  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="flex-start"
    >
      <Grid item xs={4}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          style={{ height: "90vh" }}
        >
          {/* <Paper variant="outlined"> */}
          <div
          // style={{
          //   backgroundColor: "#006666",
          // }}
          >
            <img style={{ width: 300 }} src={MarketCardData.imgUrl} />
          </div>
          {/* </Paper> */}
        </Grid>
      </Grid>
      <Grid item xs={8}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          style={{ height: "90vh" }}
        >
          <Grid container style={{ marginTop: 40 }}>
            <Grid item xs={12}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="flex-start"
              >
                {/* <Paper variant="outlined"> */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginLeft: 20,
                  }}
                >
                  <div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <Typography variant="h2" display="block" gutterbottom>
                        Name: {MarketCardData.name}
                      </Typography>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginBottom: 20,
                      }}
                    >
                      <StarsIcon
                        style={{
                          verticalAlign: "middle",
                          marginTop: 5,
                          marginRight: 5,
                          fontSize: 20,
                        }}
                      />
                      <Typography
                        variant="overline"
                        display="block"
                        gutterbottom
                      >
                        Rarity: {MarketCardData.rarity}
                      </Typography>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginBottom: 10,
                      }}
                    >
                      <AccountCircleIcon
                        style={{
                          verticalAlign: "middle",
                          marginTop: 2,
                          marginRight: 5,
                          fontSize: 20,
                        }}
                      />
                      <Typography variant="body1" display="block" gutterbottom>
                        Owner: {MarketCardData.owner}
                      </Typography>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginBottom: 10,
                      }}
                    >
                      <LocalOfferSharpIcon
                        style={{
                          verticalAlign: "middle",
                          marginTop: 3,
                          marginRight: 5,
                          fontSize: 20,
                        }}
                      />
                      <Typography variant="body1" display="block" gutterbottom>
                        Price: Ξ {MarketCardData.price}
                      </Typography>
                    </div>
                    <div>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <PanToolSharpIcon
                          style={{
                            verticalAlign: "middle",
                            marginRight: 5,
                            marginTop: 2,
                            fontSize: 20,
                          }}
                        />
                        <Typography
                          variant="body1"
                          display="block"
                          gutterbottom
                        >
                          Highest Bid: Ξ {MarketCardData.auctionPrice}
                        </Typography>
                      </div>
                      {!isThirdPerson && <Button>isThirdPerson=false</Button>}
                    </div>
                  </div>
                  <div style={{ marginRight: 140, marginTop: 30 }}>
                    <ItemButtonGroup />
                  </div>
                </div>
                {/* </Paper> */}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="flex-start"
              >
                {/* <Paper variant="outlined"> */}
                <TableContainer
                  component={Paper}
                  style={{ marginTop: 50, width: "60vw", height: "40vh" }}
                >
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Type</TableCell>
                        <TableCell align="center">From</TableCell>
                        <TableCell align="center">To</TableCell>
                        <TableCell align="center">Amount</TableCell>
                        <TableCell align="center">Txn</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow key={0}>
                        <TableCell align="center">a</TableCell>

                        <TableCell align="center">b</TableCell>
                        <TableCell align="center">c</TableCell>
                        <TableCell align="center">d</TableCell>
                        <TableCell align="center">e</TableCell>
                      </TableRow>
                      <TableRow key={1}>
                        <TableCell align="center">a</TableCell>

                        <TableCell align="center">b</TableCell>
                        <TableCell align="center">c</TableCell>
                        <TableCell align="center">d</TableCell>
                        <TableCell align="center">e</TableCell>
                      </TableRow>
                      <TableRow key={2}>
                        <TableCell align="center">a</TableCell>

                        <TableCell align="center">b</TableCell>
                        <TableCell align="center">c</TableCell>
                        <TableCell align="center">d</TableCell>
                        <TableCell align="center">e</TableCell>
                      </TableRow>
                      <TableRow key={3}>
                        <TableCell align="center">a</TableCell>

                        <TableCell align="center">b</TableCell>
                        <TableCell align="center">c</TableCell>
                        <TableCell align="center">d</TableCell>
                        <TableCell align="center">e</TableCell>
                      </TableRow>
                      <TableRow key={4}>
                        <TableCell align="center">a</TableCell>

                        <TableCell align="center">b</TableCell>
                        <TableCell align="center">c</TableCell>
                        <TableCell align="center">d</TableCell>
                        <TableCell align="center">e</TableCell>
                      </TableRow>
                      <TableRow key={5}>
                        <TableCell align="center">a</TableCell>

                        <TableCell align="center">b</TableCell>
                        <TableCell align="center">c</TableCell>
                        <TableCell align="center">d</TableCell>
                        <TableCell align="center">e</TableCell>
                      </TableRow>
                      <TableRow key={6}>
                        <TableCell align="center">a</TableCell>

                        <TableCell align="center">b</TableCell>
                        <TableCell align="center">c</TableCell>
                        <TableCell align="center">d</TableCell>
                        <TableCell align="center">e</TableCell>
                      </TableRow>
                      <TableRow key={7}>
                        <TableCell align="center">a</TableCell>

                        <TableCell align="center">b</TableCell>
                        <TableCell align="center">c</TableCell>
                        <TableCell align="center">d</TableCell>
                        <TableCell align="center">e</TableCell>
                      </TableRow>
                      <TableRow key={8}>
                        <TableCell align="center">a</TableCell>

                        <TableCell align="center">b</TableCell>
                        <TableCell align="center">c</TableCell>
                        <TableCell align="center">d</TableCell>
                        <TableCell align="center">e</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                {/* </Paper> */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ItemPage;
