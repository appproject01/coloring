import AppLayout from "../components/AppLayout";
import { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
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
  const { project } = useParams();
  const location = useLocation();
  const { book, mode, preloadedData } = location.state || {};
  //const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading, isError, errorText } = useFetchSearchResults(
    searchQuery,
    book,
    preloadedData
  );

  //   useEffect(() => {
  //     if (searchQuery === "") {
  //       setResults([]);
  //       setLoading(false);
  //       return;
  //     }

  //     debouncer.run(() => {
  //       setLoading(true);
  //       fetchResults(searchQuery);
  //     });
  //   }, [searchQuery]);

  //   const fetchResults = async (query) => {
  //     try {
  //       const response = await axios.get("https://example.com/api/solutions", {
  //         params: { query },
  //       });

  //       setResults(response.data);
  //     } catch (error) {
  //       console.error("Failed to fetch results:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <AppLayout project={project} book={book}>
      {isError && <p>Error: {errorText}</p>}
      {isLoading && <p>Loading...</p>}
      <Box sx={{ padding: "16px" }}>
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
              <ListItem key={index} button={"true"}>
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
