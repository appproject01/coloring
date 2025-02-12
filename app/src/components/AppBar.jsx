import { AppBar, Toolbar, IconButton, Box, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";
import PropTypes from "prop-types";

const CustomAppBar = ({ onMenuClick, headerText }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#2196f3",
        // zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
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
          <Typography variant="h6" noWrap component="div">
            {headerText}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

CustomAppBar.propTypes = {
  onMenuClick: PropTypes.func.isRequired,
  headerText: PropTypes.string,
};

export { CustomAppBar };
