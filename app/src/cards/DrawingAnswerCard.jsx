import { Card, CardContent, Typography, Box, Skeleton } from "@mui/material";
import PropTypes from "prop-types";
import { useFetchImage } from "../hooks/useFetchImage";

const DrawingAnswerCard = ({ data }) => {
  const {
    data: imageData,
    isLoading,
    isError,
    errorText,
  } = useFetchImage(data.artwork ?? "");

  // const [imageHeight, setImageHeight] = useState(500);

  const getFileExtension = (filename) => {
    return filename.split(".").pop().toLowerCase();
  };

  // const handleImageLoad = (event) => {
  //   setImageHeight(event.target.naturalHeight);
  // };

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
      <Box
        sx={{
          width: "100%",
          height: isLoading ? 400 : "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isLoading ? (
          <Skeleton variant="rectangular" width="100%" height="100%" />
        ) : (
          imageData && (
            <Box
              component="img"
              sx={{
                width: "100%",
                height: "auto",
                objectFit: "contain", // Ensure the aspect ratio is maintained
              }}
              src={`data:image/${getFileExtension(imageData.name)};base64,${
                imageData.image
              }`}
              alt={"Drawing " + data.id}
            />
          )
        )}
      </Box>
      <CardContent>
        <Typography
          component="div"
          dangerouslySetInnerHTML={{ __html: data.description }}
        />
      </CardContent>
    </Card>
  );
};

DrawingAnswerCard.propTypes = {
  data: PropTypes.object.isRequired,
};

export { DrawingAnswerCard };
