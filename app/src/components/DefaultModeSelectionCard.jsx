import {
  Card,
  CardActionArea,
  CardContent,
  Box,
  Icon,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const DefaultModeSelectionCard = ({ project, book, mode }) => {
  const navigate = useNavigate();
  //   const { data: preloadedData } = useFetchSearchResults("", book);

  return (
    <Card sx={{ margin: "12px", elevation: 10 }}>
      <CardActionArea onClick={() => navigate(`/${project}/${book}/${mode}`)}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Icon sx={{ fontSize: 96 }}>{mode}</Icon>
            <Typography variant="h4">{mode}</Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export { DefaultModeSelectionCard };

DefaultModeSelectionCard.propTypes = {
  project: PropTypes.string.isRequired,
  book: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
};
