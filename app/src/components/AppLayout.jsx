import { useState } from "react";
import PropTypes from "prop-types";
import { Box, LinearProgress } from "@mui/material";
import { CustomAppBar } from "./AppBar";
import CustomDrawer from "./Drawer";

const AppLayout = ({ children, project, book, mode, id }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const headerText = `${project}-${book}-${mode}-${id}`;

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
          display: "flex",
          flexDirection: "column",
          height: "100dvh",
        }}
      >
        <CustomAppBar
          onMenuClick={toggleDrawer(true)}
          headerText={headerText}
          mode={mode}
        />
        <CustomDrawer open={drawerOpen} onClose={toggleDrawer(false)} />
        <LinearProgress sx={{ width: "100%", mt: 7 }} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            overflow: "auto",
            display: "flex",
            //mt: 7,
            flexDirection: "column",
          }}
        >
          {children}
        </Box>
      </Box>
    </>
  );
};

// Add prop-type validation
AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
  project: PropTypes.string.isRequired,
  book: PropTypes.string,
  mode: PropTypes.string,
  id: PropTypes.string,
};

export { AppLayout };
