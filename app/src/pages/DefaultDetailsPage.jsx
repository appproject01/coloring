import { AppLayout } from "../components/AppLayout";
import { DefaultCardLayout } from "../components/DefaultCardLayout";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useFetchSolution } from "../hooks/useFetchSolution";

const DefaultDetailsPage = () => {
  const { project, book, mode, id } = useParams();

  const { data, isLoading, isError, errorText } = useFetchSolution(id);

  return (
    <AppLayout project={project} book={book} mode={mode} id={id}>
      {isError && <p>Error: {errorText}</p>}
      {isLoading && <p>Loading...</p>}
      {data?.steps?.length > 0 && (
        <DefaultCardLayout>
          {data.steps.map((step, index) => (
            <Box key={index}>{step.description}</Box>
          ))}
        </DefaultCardLayout>
      )}
    </AppLayout>
  );
};

DefaultDetailsPage.propTypes = {
  project: PropTypes.string.isRequired,
  book: PropTypes.string,
};

export { DefaultDetailsPage };
