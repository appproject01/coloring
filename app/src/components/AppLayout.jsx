import { useState } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { CustomAppBar } from "./AppBar";
import CustomDrawer from "./Drawer";
import { HeaderTextProvider } from "../context/HeaderTextProvider";

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
      <HeaderTextProvider>
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
          />
          <CustomDrawer open={drawerOpen} onClose={toggleDrawer(false)} />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              overflow: "auto",
              display: "flex",

              flexDirection: "column",
            }}
          >
            {children}
          </Box>
        </Box>
      </HeaderTextProvider>
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
