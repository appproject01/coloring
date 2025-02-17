import { AppLayout } from "../components/AppLayout";
import { DefaultCardLayout } from "../components/DefaultCardLayout";
import { Typography, Box } from "@mui/material";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useFetchSolution } from "../hooks/useFetchSolution";
import { DrawingSolutionCard } from "../cards/DrawingSolutionCard";
import { DrawingAnswerCard } from "../cards/DrawingAnswerCard";
import { SudokuSolutionCard } from "../cards/SudokuSolutionCard";
import { SudokuAnswerCard } from "../cards/SudokuAnswerCard";

const DefaultDetailsPage = () => {
  const { project, book, mode, id } = useParams();

  const { data, isLoading, isError, errorText } = useFetchSolution(project, id);

  return (
    <AppLayout
      project={project}
      book={book}
      mode={mode}
      id={id}
      isLoading={isLoading}
    >
      {/* call the function to return various layouts per project and mode */}
      {layoutFunctions[project]?.[mode]?.(data)}
      {isError && <Typography color="error">Error: {errorText}</Typography>}
    </AppLayout>
  );
};

DefaultDetailsPage.propTypes = {
  project: PropTypes.string.isRequired,
  book: PropTypes.string,
};

const layoutFunctions = {
  drawing: {
    solution: getDrawingSolutionLayout,
    answer: getDrawingAnswerLayout,
  },
  sudoku: {
    solution: getSudokuSolutionLayout,
    answer: getSudokuAnswerLayout,
  },
};

///  functions to return different layouts per project and mode
function getDrawingAnswerLayout(data) {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",

        p: 2,
      }}
    >
      {data && <DrawingAnswerCard data={data} />}
    </Box>
  );
}

function getDrawingSolutionLayout(data) {
  return (
    <>
      {data?.steps?.length > 0 && (
        <DefaultCardLayout>
          {data.steps.map((step, index) => (
            <DrawingSolutionCard stepData={step} key={index} />
          ))}
        </DefaultCardLayout>
      )}
    </>
  );
}

function getSudokuSolutionLayout(data) {
  return (
    <>
      {data?.steps?.length > 0 && (
        <DefaultCardLayout>
          {data.steps.map((step, index) => (
            <SudokuSolutionCard stepData={step} key={index} />
          ))}
        </DefaultCardLayout>
      )}
    </>
  );
}

function getSudokuAnswerLayout(data) {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",

        p: 2,
      }}
    >
      {data && <SudokuAnswerCard data={data} />}
    </Box>
  );
}

export { DefaultDetailsPage };
