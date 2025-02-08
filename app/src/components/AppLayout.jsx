import { useState } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import CustomAppBar from "./AppBar";
import CustomDrawer from "./Drawer";
import CustomFloatingActionButton from "./FloatingActionButton";

export default function AppLayout({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <>
      <Box
        sx={{
          width: "100vw",
          height: "100dvh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CustomAppBar onMenuClick={toggleDrawer(true)} />
        <CustomDrawer open={drawerOpen} onClose={toggleDrawer(false)} />
        <Box component="main" sx={{ flexGrow: 1 }}>
          {children}
        </Box>
        <CustomFloatingActionButton />
      </Box>
    </>
  );
}

// Add prop-type validation
AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
