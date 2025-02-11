import React from "react";
import { Grid, Card } from "@mui/material";
import PropTypes from "prop-types";

const DefaultCardLayout = ({ children }) => {
  return (
    <Grid container spacing={3}>
      {React.Children.map(children, (child, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card>{child}</Card>
        </Grid>
      ))}
    </Grid>
  );
};

DefaultCardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export { DefaultCardLayout };
