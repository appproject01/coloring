import { Fab } from "@mui/material";
import { Add } from "@mui/icons-material";

export default function CustomFloatingActionButton() {
  return (
    <Fab
      color="primary"
      aria-label="add"
      sx={{ position: "fixed", bottom: 16, right: 16 }}
    >
      <Add />
    </Fab>
  );
}
