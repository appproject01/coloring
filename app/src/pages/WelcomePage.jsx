import AppLayout from "../components/AppLayout";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Icon,
} from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import useFetchSearchResults from "../hooks/useFetchSearchResults";

export default function Page() {
  const { project, book: rawBook } = useParams();
  // url may contain names like "Book_121", here it is replaced with "Book 121"
  const book = rawBook ? rawBook.replace(/_/g, " ") : rawBook;
  const navigate = useNavigate();

  const { data: preloadedData } = useFetchSearchResults("", book);

  const handleCardClick = (mode) => {
    navigate(`/${project}/search`, { state: { mode, book, preloadedData } });
  };

  return (
    <AppLayout project={project} book={book}>
      <Box sx={{ padding: "16px" }}>
        <Card sx={{ margin: "12px", elevation: 10 }}>
          <CardActionArea onClick={() => handleCardClick("S")}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Icon sx={{ fontSize: 96 }}>settings_suggest</Icon>
                <Typography variant="h4">
                  {project}
                  {book}
                  Step-by-step solutions:
                </Typography>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card sx={{ margin: "12px", elevation: 10 }}>
          <CardActionArea onClick={() => handleCardClick("A")}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Icon sx={{ fontSize: 96 }}>question_answer</Icon>
                <Typography variant="h4">Answers</Typography>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </AppLayout>
  );
}

Page.propTypes = {
  project: PropTypes.string.isRequired,
  book: PropTypes.string,
};
