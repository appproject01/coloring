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
        margin: "8px",
        elevation: 10,
        flexGrow: 1,
        height: "100%",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardActionArea onClick={() => navigate(`/${project}/${book}/${mode}`)}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon sx={{ fontSize: 96 }}>{icon}</Icon>
            <Typography variant="h4">{subtitle}</Typography>
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
