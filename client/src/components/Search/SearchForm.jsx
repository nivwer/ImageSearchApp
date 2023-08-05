// Hooks.
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGetPopularSearchesQuery } from "../../api/apiSlice";
// Components.
import { Paper, IconButton, Autocomplete, TextField } from "@mui/material";
// Icons.
import SearchIcon from "@mui/icons-material/Search";

// Component.
export function SearchForm() {
  const theme = useTheme();
  const navigate = useNavigate();
  // Input Search.
  const [searchData, setSearchData] = useState("");
  // Popular Searches options.
  const [searchesOptions, setSearchesOptions] = useState([]);
  // Query for get the Popular Searches data.
  const { data: popularSearchesData } = useGetPopularSearchesQuery("50");

  // Submit.
  const handleSubmit = (e) => {
    // Prevent refresh page.
    e.preventDefault();

    // Navigate to the results page.
    if (searchData) {
      const query = searchData.toLowerCase().trim().replace(/\s+/g, " ");
      navigate(`/home/results/?query=${query}&page=1`);
    } else {
      // If the query is undefined.
      navigate(`/home`);
    }
  };

  // Get the Default Searches options.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/searches.json");
        const data = await response.json();
        setSearchesOptions(data.searches);
      } catch (e) {
        console.error("Error:", e);
      }
    };
    fetchData();
  }, []);

  // Get the Popular Searches options.
  useEffect(() => {
    // Append the Popular Searches options to Default Searches options.
    if (popularSearchesData) {
      const newOptions = popularSearchesData.popular_searches;
      // Remove duplicate options from Default Searches options.
      const filteredOptions = searchesOptions.filter(
        (option) => !newOptions.find((o) => o.query === option.query)
      );
      setSearchesOptions([...newOptions, ...filteredOptions]);
    }
  }, [popularSearchesData]);

  return (
    <>
      {/* Input Search. */}
      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: "0",
          display: "flex",
          alignItems: "center",
          width: "auto",
          m: "auto",
          maxWidth: { xs: "100vw", md: "570px" },
          outline: `1px solid ${theme.palette.text.disabled}`,
          borderRadius: "100px",
        }}
      >
        {/* Autocomplete Searches. */}
        {/* Responsive component. */}
        <Autocomplete
          freeSolo
          id="auto-complete"
          size="small"
          autoComplete
          sx={{ flex: 1, display: "block" }}
          disableClearable
          includeInputInList
          options={searchesOptions.map((option) => option.query)}
          onInputChange={(e, newValue) => {
            setSearchData(newValue);
          }}
          onSubmit={handleSubmit}
          ListboxProps={{ style: { height: "100%", maxHeight: "100%" } }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search"
              InputProps={{
                ...params.InputProps,
                type: "search",
                "aria-label": "search",
                style: {
                  width: "auto",
                  borderTopLeftRadius: "100px",
                  borderBottomLeftRadius: "100px",
                  paddingLeft: "20px",
                  backgroundColor: theme.palette.background.primary,
                },
              }}
            />
          )}
          PaperComponent={(props) => (
            <Paper
              {...props}
              sx={{
                m: "auto",
                marginTop: "3px",
                width: { xs: "100vw", md: "auto" },
                height: {
                  xs: "calc(100vh - 51px)",
                  sm: "calc(100vh - 55px)",
                  md: "400px",
                },
                position: { xs: "absolute", md: "static" },
                left: { xs: -58, sm: -66, md: "none" },
              }}
            />
          )}
        />
        {/* Icon Search. */}
        <IconButton
          onClick={handleSubmit}
          type="button"
          sx={{
            p: "7px",
            mr: "12px",
            ml: "7px",
            color: theme.palette.text.primary,
          }}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </>
  );
}

export default SearchForm;
