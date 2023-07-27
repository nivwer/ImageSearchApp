import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Paper, InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export function SearchForm() {
  const [searchData, setSearchData] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchData(e.target.value);
  };

  const handleSubmit = (e) => {
    // prevent refresh page
    e.preventDefault();

    if (searchData) {
      navigate(`/home/results/?query=${searchData}&page=1`);
    } else {
      navigate(`/home`);
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: "2px 10px 2px 20px",
        display: "flex",
        alignItems: "center",
        width: "auto",
        m: "auto",
        maxWidth: "550px",
        border: '1px solid #373737',
        borderRadius: '100px'
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search"
        onChange={handleChange}
        inputProps={{ "aria-label": "search" }}
      />

      <IconButton
        onClick={handleSubmit}
        type="button"
        sx={{ p: "5px", color: '#373737' }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default SearchForm;
