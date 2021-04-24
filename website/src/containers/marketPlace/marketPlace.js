import React from "react";
import { Container, Typography } from "@material-ui/core";
import MarketTab from "../../components/marketCard/marketTab";

const MarketPlace = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" color="primary" style={{ marginBottom: 20,
                                                        marginTop: 30}}>
        MarketPlace
      </Typography>

      <MarketTab style={{marginTop: 10}}/>
    </Container>
  );
};

export default MarketPlace;
