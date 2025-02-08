import { AppBar, Toolbar, IconButton, Box } from "@mui/material";
import { Menu, Search } from "@mui/icons-material";
import PropTypes from "prop-types";

export default function CustomAppBar({ onMenuClick }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenuClick}
        >
          <Menu />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton color="inherit" aria-label="search">
          <Search />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

CustomAppBar.propTypes = {
  onMenuClick: PropTypes.func.isRequired,
};
