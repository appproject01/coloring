import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import { Home as HomeIcon, Settings } from "@mui/icons-material";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function CustomDrawer({ open, onClose }) {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={onClose}
        onKeyDown={onClose}
      >
        <Box
          sx={{
            backgroundColor: "primary.main",
            color: "white",
            padding: "16px",
            textAlign: "center",
          }}
        >
          <h2>My App</h2>
        </Box>
        <List>
          <ListItem component={Link} to="/">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem component={Link} to="/settings">
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}

CustomDrawer.propTypes = {
  open: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
