import {
  AppBar,
  Toolbar,
  Typography,
  Card,
  CardContent,
  Box,
} from "@mui/material";

const Settings = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100dvh",
        width: "100vw",
      }}
    >
      {/* Fixed App Header */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#2196f3",
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            My App Header
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Body with Two Cards */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          mt: 7,
          borderTop: "1px solid red",
        }}
      >
        {/* First Card */}
        <Card sx={{ flexGrow: 1, m: 2 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Card 1
            </Typography>
            <Typography variant="body2">
              This is the first card taking up half of the viewport height.
            </Typography>
          </CardContent>
        </Card>

        {/* Second Card */}
        <Card sx={{ flexGrow: 1, m: 2 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Card 2
            </Typography>
            <Typography variant="body2">
              This is the second card taking up the other half of the viewport
              height.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export { Settings };
