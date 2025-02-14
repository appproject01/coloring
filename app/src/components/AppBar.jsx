import { AppBar, Toolbar, IconButton, Box, Typography } from "@mui/material";
import { Menu, ArrowBack } from "@mui/icons-material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const CustomAppBar = ({ onMenuClick, headerText, mode }) => {
  const navigate = useNavigate();
  return (
    <AppBar
      //position="fixed"
      position="relative"
      sx={{
        backgroundColor: "#2196f3",
        // zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        {mode ? (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="back"
            onClick={() => navigate(-1)}
          >
            <ArrowBack />
          </IconButton>
        ) : (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onMenuClick}
          >
            <Menu />
          </IconButton>
        )}

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
  mode: PropTypes.string,
};

export { CustomAppBar };
