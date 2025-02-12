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
import { projectModeMap } from "./projectModeMap";

const DefaultModeSelectionCard = ({ project, book, mode }) => {
  const navigate = useNavigate();
  //   const { data: preloadedData } = useFetchSearchResults("", book);

  const { icon, subtitle } = projectModeMap[project][mode];
  //const a = 1;

  return (
    <Card
      sx={{
        flexGrow: 1,
        m: 2,
        elevation: 10,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        display: "flex", // Add this
        flexDirection: "column", // Add this
      }}
    >
      <CardActionArea
        onClick={() => navigate(`/${project}/${book}/${mode}`)}
        sx={{ flexGrow: 1 }}
      >
        <CardContent
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon sx={{ fontSize: 96 }}>{icon}</Icon>
          <Typography variant="h4">{subtitle}</Typography>
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
