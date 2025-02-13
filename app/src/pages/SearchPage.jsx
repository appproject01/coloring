import { AppLayout } from "../components/AppLayout";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetchSearchResults from "../hooks/useFetchSearchResults";
import {
  Box,
  TextField,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  IconButton,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

//const debouncer = new Debouncer(950);

export default function Page() {
  const { project, book, mode } = useParams();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading, isError, errorText } = useFetchSearchResults(
    searchQuery,
    book,
    []
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleCardClick = (id) => {
    navigate(`/${project}/${book}/${mode}/${id}`);
  };

  return (
    <AppLayout project={project} book={book} mode={mode}>
      {isError && <p>Error: {errorText}</p>}
      {isLoading && <p>Loading...</p>}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          //mt: 7,
          backgroundColor: "#f5f5f5",
          width: "100vw",
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          label="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleClearSearch}>
                <ClearIcon />
              </IconButton>
            ),
          }}
        />
        {isLoading ? (
          <CircularProgress sx={{ marginTop: "16px" }} />
        ) : (
          <List>
            {data.map((result, index) => (
              <ListItem
                key={index}
                button={"true"}
                onClick={() => handleCardClick(result.id)}
              >
                <ListItemText
                  primary={result.name}
                  secondary={`Book: ${result.book}`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </AppLayout>
  );
}
