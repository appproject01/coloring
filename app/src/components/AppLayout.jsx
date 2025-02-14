import { useState } from "react";
import PropTypes from "prop-types";
import { Box, LinearProgress } from "@mui/material";
import { CustomAppBar } from "./AppBar";
import CustomDrawer from "./Drawer";
import { heading1Map, projectModeMap } from "../components/ProjectModeMap";

const AppLayout = ({
  children,
  project,
  book,
  mode,
  id,
  isLoading = false,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const headerText = getHeaderText(project, book, mode, id);

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
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CustomAppBar
            onMenuClick={toggleDrawer(true)}
            headerText={headerText}
            mode={mode}
          />
          <LinearProgress
            sx={{
              width: "100%",
              //mt: 8,
              visibility: isLoading ? "visible" : "hidden",
            }}
          />
        </Box>
        <CustomDrawer open={drawerOpen} onClose={toggleDrawer(false)} />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            overflow: "auto",
            display: "flex",
            // mt: 8,
            flexDirection: "column",
          }}
        >
          {children}
        </Box>
      </Box>
    </>
  );
};

function getHeaderText(project, book, mode, id) {
  // function to clean the id from prefix
  const cleanId = (str) => {
    const parts = str.split("-");
    if (parts.length > 2) {
      return parts.slice(2).join("-");
    }
    return "";
  };

  //  expression to convert book to UI text
  const bookToShow = book
    ? book === "all"
      ? "all books"
      : String(book).replace(/_/g, " ")
    : "";

  if (project && book && mode && id) {
    // details page header
    const header = projectModeMap[project]?.[mode]?.heading3 ?? "";
    return `${header} ${cleanId(id)} (${bookToShow})`;
  }

  if (project && book && mode) {
    // search page header
    const header = projectModeMap[project]?.[mode]?.heading2 ?? "";
    return `${header}: ${bookToShow}`;
  }

  if (project) {
    // start page header
    const header = heading1Map[project];
    return header
      ? `${header}: ${bookToShow}`
      : `Unsupported project: ${project}`;
  }

  return `Unsupported project: ${project}`;
}

// Add prop-type validation
AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
  project: PropTypes.string.isRequired,
  book: PropTypes.string,
  mode: PropTypes.string,
  id: PropTypes.string,
  isLoading: PropTypes.bool,
};

export { AppLayout };
