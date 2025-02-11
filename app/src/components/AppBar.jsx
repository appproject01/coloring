import { AppBar, Toolbar, IconButton, Box, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";
import PropTypes from "prop-types";

const CustomAppBar = ({ onMenuClick, headerText }) => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#2196f3" }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenuClick}
        >
          <Menu />
        </IconButton>
        <Box sx={{ flexGrow: 1, textAlign: "left" }}>
          <Typography variant="h8">{headerText}</Typography>
        </Box>
        {/* <Box sx={{ flexGrow: 1 }} /> */}
        {/* <IconButton color="inherit" aria-label="search">
          <Search />
        </IconButton> */}
      </Toolbar>
    </AppBar>
  );
};

CustomAppBar.propTypes = {
  onMenuClick: PropTypes.func.isRequired,
  headerText: PropTypes.string,
};

export { CustomAppBar };
