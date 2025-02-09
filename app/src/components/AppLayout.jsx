import { useState } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import CustomAppBar from "./AppBar";
import CustomDrawer from "./Drawer";
import CustomFloatingActionButton from "./FloatingActionButton";

export default function AppLayout({ children, project, book }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const headerText = getHeaderText(project, book);

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
        <CustomAppBar
          onMenuClick={toggleDrawer(true)}
          headerText={headerText}
        />
        <CustomDrawer open={drawerOpen} onClose={toggleDrawer(false)} />
        <Box component="main" sx={{ flexGrow: 1 }}>
          {children}
        </Box>
        <CustomFloatingActionButton />
      </Box>
    </>
  );
}

function getHeaderText(project, book) {
  const headerText = (book || "all") + " - " + (project || "noproject");

  return headerText;
}

// Add prop-type validation
AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
  project: PropTypes.string,
  book: PropTypes.string,
};
