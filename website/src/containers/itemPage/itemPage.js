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
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";

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
          <Grid container>
            <Grid item xs={12}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="flex-start"
              >
                {/* <Paper variant="outlined"> */}
                <div
                // style={{
                //   backgroundColor: "#666600",
                //   width: "100%",
                // }}
                >
                  Name: {MarketCardData.name}
                </div>
                <div>Rarity: {MarketCardData.rarity}</div>
                <div>owner: {MarketCardData.owner}</div>
                <div>price: {MarketCardData.price}</div>
                <div>
                  highest bid: milyor milyar ETH
                  {!isThirdPerson && <Button>isThirdPerson=false</Button>}
                </div>
                <ItemButtonGroup />
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
                  style={{ marginTop: 50, width: "60vw", height: "50vh" }}
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
                      <TableRow key={0} style={{ backgroundColor: "#00ff00" }}>
                        <TableCell align="center">a</TableCell>

                        <TableCell align="center">b</TableCell>
                        <TableCell align="center">c</TableCell>
                        <TableCell align="center">d</TableCell>
                        <TableCell align="center">e</TableCell>
                      </TableRow>
                      <TableRow key={1} style={{ backgroundColor: "#0000ff" }}>
                        <TableCell align="center">a</TableCell>

                        <TableCell align="center">b</TableCell>
                        <TableCell align="center">c</TableCell>
                        <TableCell align="center">d</TableCell>
                        <TableCell align="center">e</TableCell>
                      </TableRow>
                      <TableRow key={2} style={{ backgroundColor: "#ff0000" }}>
                        <TableCell align="center">a</TableCell>

                        <TableCell align="center">b</TableCell>
                        <TableCell align="center">c</TableCell>
                        <TableCell align="center">d</TableCell>
                        <TableCell align="center">e</TableCell>
                      </TableRow>
                      <TableRow key={3} style={{ backgroundColor: "#ff00ff" }}>
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
