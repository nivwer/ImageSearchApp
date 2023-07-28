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
} from "@mui/material";

export function SearchForm() {
  const [searchData, setSearchData] = useState("");
  const [searchesOptions, setSearchesOptions] = useState([]);
  const popularSearchesData = useSelector((state) => state.popularSearchesData);

  const navigate = useNavigate();

  useEffect(() => {
    setSearchesOptions([
      { query: "1" },
      { query: "2" },
      { query: "3" },
      { query: "3 3" },
      { query: "3 " },
      { query: " 3" },
      { query: "3 2" },
    ]);
  }, []);

  //  useEffect(() => {
  //    fetch("/data/searches.json")
  //      .then((response) => response.json())
  //      .then((data) => setSearchesOptions(data.searches))
  //      .catch((error) => console.error("Error:", error));
  //  }, [ ]);

  const handleChange = (e) => {
    setSearchData(e.target.value);
  };

  const handleSubmit = (e) => {
    // prevent refresh page
    e.preventDefault();

    if (searchData) {
      const query = searchData.toLowerCase().trim().replace(/\s+/g, " ");
      navigate(`/home/results/?query=${query}&page=1`);
    } else {
      navigate(`/home`);
    }
  };

  // useEffect(() => {
  //   if (popularSearchesData) {
  //     const newOptions = popularSearchesData.popular_searches;
  //     setOptions([...newOptions, ...options]);
  //   }
  // }, []);

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
          maxWidth: "550px",
          border: "1px solid #373737",
          borderRadius: "5px",
        }}
      >
        <Autocomplete
          freeSolo
          id="size-small-outlined"
          size="small"
          sx={{ flex: 1 }}
          disableClearable
          options={searchesOptions.map((option) => option.query)}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search"
              InputProps={{
                ...params.InputProps,
                type: "search",
                "aria-label": "search",
              }}
              onChange={handleChange}
            />
          )}
        />

        <IconButton
          onClick={handleSubmit}
          type="button"
          sx={{ p: "5px", color: "#373737" }}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </>
  );
}

export default SearchForm;
