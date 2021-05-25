import React from "react";

import { makeStyles, GridList, GridListTile } from "@material-ui/core";
import MarketCard from "./marketCard";

import withWidth, { isWidthUp } from "@material-ui/core/withWidth";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  gridList: {
    padding: "auto",
    margin: "auto",
  },
}));

const MarketCardList = (props) => {
  const classes = useStyles();
  // console.log(props.marketCards);

  const getGridListCols = () => {
    if (isWidthUp("xl", props.width)) {
      return 4;
    }

    if (isWidthUp("lg", props.width)) {
      return 3;
    }

    if (isWidthUp("md", props.width)) {
      return 2;
    }
    if (isWidthUp("sm", props.width)) {
      return 2;
    }

    return 1;
  };

  return (
    <GridList
      spacing={15}
      cellHeight={400}
      cols={getGridListCols()}
      className={classes.gridList}
    >
      {props.marketCards.map((cardItem, index) => {
        // console.log(
        //   cardItem.name,
        //   cardItem.rarity,
        //   cardItem.cid,
        //   cardItem.sellPrice,
        //   cardItem.maxBid,
        //   cardItem.clothType
        // );
        return (
          <GridListTile key={index}>
            <MarketCard
              name={cardItem.name}
              frequency={cardItem.rarity}
              owner={cardItem.owner}
              imgUrl={"https://ipfs.io/ipfs/"+cardItem.cid}
              price={cardItem.sellPrice}
              auctionPrice={cardItem.maxBid}
              type={cardItem.clothType}
              isBiddable={cardItem.isBiddable}
              isOnSale={cardItem.isOnSale}
              id={cardItem.id}
              isProfile={props.isProfile}
            />
          </GridListTile>
        );
      })}
    </GridList>
  );
};

{
  /* <GridList cellHeight={180} className={classes.gridList}>
  <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
    <ListSubheader component="div">December</ListSubheader>
  </GridListTile>
  {tileData.map((tile) => (
    <GridListTile key={tile.img}>
      <img src={tile.img} alt={tile.title} />
      <GridListTileBar
        title={tile.title}
        subtitle={<span>by: {tile.author}</span>}
        actionIcon={
          <IconButton
            aria-label={`info about ${tile.title}`}
            className={classes.icon}
          >
            <InfoIcon />
          </IconButton>
        }
      />
    </GridListTile>
  ))}
</GridList>; */
}

export default withWidth()(MarketCardList);
