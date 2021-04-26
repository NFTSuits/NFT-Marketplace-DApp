import React from "react";
import { makeStyles, Button, Grid, Container, Paper } from "@material-ui/core";
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
          <Paper variant="outlined">
            <div
            // style={{
            //   backgroundColor: "#006666",
            // }}
            >
              <img style={{ width: 300 }} src={MarketCardData.imgUrl} />
            </div>
          </Paper>
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
                <Paper variant="outlined">
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
                </Paper>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Paper variant="outlined">Table</Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ItemPage;
