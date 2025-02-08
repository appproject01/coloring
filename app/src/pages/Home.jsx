import BooksListWidget from "../components/BooksListWidget";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box sx={{ padding: "16px" }}>
      <BooksListWidget />
    </Box>
  );
}
