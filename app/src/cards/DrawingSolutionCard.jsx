import { Card, CardContent, Typography, Box, Skeleton } from "@mui/material";
import PropTypes from "prop-types";
import { useFetchImage } from "../hooks/useFetchImage";
import { ErrorOutline } from "@mui/icons-material";

const DrawingSolutionCard = ({ stepData }) => {
  const {
    data: imageData,
    isLoading,
    isError,
    errorText,
  } = useFetchImage(stepData.image);

  const getFileExtension = (filename) => {
    return filename ? filename.split(".").pop().toLowerCase() : "jpeg";
  };

  return (
    <Card
      sx={{
        margin: 2,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // Center align the content
      }}
    >
      {isError && <p>Error: {errorText}</p>}

      {isError && (
        <>
          <Box
            sx={{
              width: "100%",
              height: "500px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ErrorOutline sx={{ fontSize: 100, color: "red" }} />
          </Box>
          <CardContent>
            <Typography variant="h5" textAlign={"center"}>
              {"Step " + stepData.id}
            </Typography>
          </CardContent>
        </>
      )}

      {isLoading && (
        <Skeleton variant="rectangular" width="100%" height={500} />
      )}
      {imageData && (
        <>
          <Box
            component="img"
            sx={{
              width: "100%",
              height: "auto",

              //maxHeight: 200, // Resize to fit within the card
              objectFit: "contain", // Ensure the aspect ratio is maintained
            }}
            src={`data:image/${getFileExtension(imageData.name)};base64,${
              imageData.image
            }`}
            alt={"Step " + stepData.id}
          />
          <CardContent>
            <Typography variant="h5" textAlign={"center"}>
              {"Step " + stepData.id}
            </Typography>
          </CardContent>
        </>
      )}
    </Card>
  );
};

DrawingSolutionCard.propTypes = {
  stepData: PropTypes.object.isRequired,
};

export { DrawingSolutionCard };
