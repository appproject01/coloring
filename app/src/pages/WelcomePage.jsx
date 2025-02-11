import { AppLayout } from "../components/AppLayout";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
//import useFetchSearchResults from "../hooks/useFetchSearchResults";
import { DefaultModeSelectionCard } from "../components/DefaultModeSelectionCard";

const WelcomePage = () => {
  const { project, book } = useParams();

  // const { data: preloadedData } = useFetchSearchResults("", book);

  return (
    <AppLayout project={project} book={book}>
      <Box sx={{ padding: "16px" }}>
        <DefaultModeSelectionCard
          project={project}
          book={book}
          mode="solution"
        />
        <DefaultModeSelectionCard project={project} book={book} mode="answer" />
      </Box>
    </AppLayout>
  );
};

WelcomePage.propTypes = {
  project: PropTypes.string.isRequired,
  book: PropTypes.string.isRequired,
};

export { WelcomePage };
