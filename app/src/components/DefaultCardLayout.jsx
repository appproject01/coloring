import React from "react";
import { Grid, Box } from "@mui/material";
import PropTypes from "prop-types";

const DefaultCardLayout = ({ children }) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        mt: 7,
        backgroundColor: "#f5f5f5",
        p: 2,
      }}
    >
      <Grid container spacing={2}>
        {React.Children.map(children, (child, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            {child}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

DefaultCardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export { DefaultCardLayout };
