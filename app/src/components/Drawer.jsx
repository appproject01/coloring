import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";
import { Home as HomeIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { projectMap } from "../components/ProjectModeMap";

export default function CustomDrawer({ open, onClose, project }) {
  const drawerAppTitle = projectMap[project]?.drawerAppTitle ?? "";
  const drawerDescription = projectMap[project]?.drawerDescription ?? "";
  const drawerSignature = projectMap[project]?.drawerSignature ?? "";

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
            backgroundColor: "#2196f3",
            color: "white",
            padding: "16px",
            textAlign: "left",
          }}
        >
          <Typography variant="h6" component="div" sx={{ textAlign: "left" }}>
            {drawerAppTitle}
          </Typography>
          <Typography
            variant="p"
            component="p"
            sx={{
              textAlign: "left",
              color: "lightblue",
              fontSize: "0.7rem",
              fontFamily: "Arial",
            }}
          >
            {drawerDescription}
            <br /> <br />
            {drawerSignature}
          </Typography>
        </Box>
        <List>
          <ListItem component={Link} to="/">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          {/* <ListItem component={Link} to="/settings">
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem> */}
        </List>
      </Box>
    </Drawer>
  );
}

CustomDrawer.propTypes = {
  open: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  project: PropTypes.string,
};
