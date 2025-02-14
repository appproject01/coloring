import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { projectModeMap } from "./ProjectModeMap";

const DefaultModeSelectionCard = ({ project, book, mode }) => {
  const navigate = useNavigate();
  //   const { data: preloadedData } = useFetchSearchResults("", book);

  const { subtitle, muiicon: MuiIcon } = projectModeMap[project]?.[mode] ?? {
    subtitle: "",
    muiicon: null,
  };
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
          }}
        >
          {MuiIcon && <MuiIcon sx={{ fontSize: 128 }} />}
          <Typography variant="h6" textAlign={"center"}>
            {subtitle}
          </Typography>
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

{
  /* <Icon sx={{ fontSize: 96 }}>{icon}</Icon> */
}
