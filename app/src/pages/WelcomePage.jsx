import { AppLayout } from "../components/AppLayout";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
//import useFetchSearchResults from "../hooks/useFetchSearchResults";
import { DefaultModeSelectionCard } from "../components/DefaultModeSelectionCard";
import { projectModeMap } from "../components/projectModeMap";

const WelcomePage = () => {
  const { project, book } = useParams();

  // const { data: preloadedData } = useFetchSearchResults("", book);
  const modes = projectModeMap[project];
  const modeEntries = Object.entries(modes);

  return (
    <AppLayout project={project} book={book}>
      <Box
        sx={{
          padding: "8px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f5f5f5",
        }}
      >
        {modeEntries.map(([mode]) => (
          <DefaultModeSelectionCard
            project={project}
            book={book}
            mode={mode}
            key={mode}
          />
        ))}
      </Box>
    </AppLayout>
  );
};

WelcomePage.propTypes = {
  project: PropTypes.string.isRequired,
  book: PropTypes.string.isRequired,
};

export { WelcomePage };

{
  /* <DefaultModeSelectionCard
project={project}
book={book}
mode="solution"
/>
<DefaultModeSelectionCard project={project} book={book} mode="answer" /> */
}
