import { AppLayout } from "../components/AppLayout";
import { DefaultCardLayout } from "../components/DefaultCardLayout";
import { CircularProgress, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useFetchSolution } from "../hooks/useFetchSolution";
import { SearchPuzzleWordCard } from "../cards/SearchPuzzleWordCard";

const DefaultDetailsPage = () => {
  const { project, book, mode, id } = useParams();

  const { data, isLoading, isError, errorText } = useFetchSolution(id);

  return (
    <AppLayout project={project} book={book} mode={mode} id={id}>
      {isLoading && <CircularProgress />}
      {data?.steps?.length > 0 && (
        <DefaultCardLayout>
          {data.steps.map((step, index) => (
            <SearchPuzzleWordCard stepData={step} key={index} />
          ))}
        </DefaultCardLayout>
      )}
      {isError && <Typography color="error">Error: {errorText}</Typography>}
    </AppLayout>
  );
};

DefaultDetailsPage.propTypes = {
  project: PropTypes.string.isRequired,
  book: PropTypes.string,
};

export { DefaultDetailsPage };
