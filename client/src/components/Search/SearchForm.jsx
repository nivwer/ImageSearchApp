import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import {
  Paper,
  InputBase,
  IconButton,
  Autocomplete,
  TextField,
  Box,
} from "@mui/material";

export function SearchForm() {
  const theme = useTheme()
  const [searchData, setSearchData] = useState("");
  const [searchesOptions, setSearchesOptions] = useState([]);
  const popularSearchesData = useSelector((state) => state.popularSearchesData);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    // Prevent refresh page.
    e.preventDefault();

    if (searchData) {
      const query = searchData.toLowerCase().trim().replace(/\s+/g, " ");
      navigate(`/home/results/?query=${query}&page=1`);
    } else {
      navigate(`/home`);
    }
  };

  useEffect(() => {
    fetch("/data/searches.json")
      .then((response) => response.json())
      .then((data) => setSearchesOptions(data.searches))
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    if (popularSearchesData) {
      const newOptions = popularSearchesData.popular_searches;
      setSearchesOptions([...newOptions, ...searchesOptions]);

      const filteredOptions = searchesOptions.filter(
        (option) => !newOptions.find((o) => o.query === option.query)
      );
      setSearchesOptions([...newOptions, ...filteredOptions]);
    }
  }, [popularSearchesData]);

  return (
    <>
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

        <IconButton
          onClick={handleSubmit}
          type="button"
          sx={{ p: "7px", mr: "12px", ml: "7px", color: theme.palette.text.primary }}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </>
  );
}

export default SearchForm;
