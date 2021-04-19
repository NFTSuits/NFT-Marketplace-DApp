import React from "react";
import { Container, Typography } from "@material-ui/core";
import MarketTab from "../../components/marketCard/marketTab";

const MarketPlace = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" color="primary">
        MarketPlace
      </Typography>

      <MarketTab />
    </Container>
  );
};

export default MarketPlace;
