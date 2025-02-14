import React from "react";
import { AppLayout } from "../components/AppLayout";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetchSearchResults from "../hooks/useFetchSearchResults";
import {
  Box,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Avatar,
  Divider,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useApplicationContext } from "../context/ApplicationContext";
import { projectModeMap } from "../components/ProjectModeMap";

//const debouncer = new Debouncer(950);

export default function Page() {
  const { project, book, mode } = useParams();
  const navigate = useNavigate();

  const { context, setContext } = useApplicationContext();
  const { searchQuery: contextSearchQuery, results: contextResults } = context;

  const [searchQuery, setSearchQuery] = useState(() => {
    return contextSearchQuery || "";
  });
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  const [results, setResults] = useState(() => {
    return contextResults || [];
  });

  const { data, isLoading, isError, errorText } = useFetchSearchResults(
    debouncedQuery,
    book
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 950); // 950ms debounce delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (data) {
      setResults(data);
      setContext({ searchQuery: debouncedQuery, results: data });
    }
  }, [data]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleClearSearch = () => {
    setDebouncedQuery("");
    setSearchQuery("");
  };

  const handleCardClick = (id, book) => {
    navigate(`/${project}/${book}/${mode}/${id}`);
  };

  const placeholder = projectModeMap[project]?.[mode]?.placeholder ?? "";
  const listName = projectModeMap[project]?.[mode]?.listName ?? "";

  return (
    <AppLayout project={project} book={book} mode={mode} isLoading={isLoading}>
      {isError && <p>Error: {errorText}</p>}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          mt: 2,
          ml: 2,
          mr: 2,
          backgroundColor: "#f5f5f5",
          overflow: "hidden",
          height: "100vh", // Ensure the container takes the full viewport height
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          //label="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder={placeholder}
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleClearSearch}>
                <ClearIcon />
              </IconButton>
            ),
          }}
        />
        <Box
          sx={{
            flexGrow: 1,
            overflow: "auto", // Enable scrolling for the results
          }}
        >
          {results && results.length > 0 && (
            <List>
              {results.map((result, index) => (
                <React.Fragment key={index}>
                  <ListItem
                    button
                    onClick={() => handleCardClick(result.id, result.book)}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Avatar sx={{ mr: 2, backgroundColor: "#2196f3" }}>
                      {index + 1}
                    </Avatar>
                    <ListItemText
                      primary={`${listName} ${result.name}`}
                      secondary={`${result.book}`}
                    />
                  </ListItem>
                  {index < results.length - 1 && (
                    <Divider sx={{ width: "90%", mx: "auto" }} />
                  )}
                </React.Fragment>
              ))}
            </List>
          )}
        </Box>
      </Box>
    </AppLayout>
  );
}
