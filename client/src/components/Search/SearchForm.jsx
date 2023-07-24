import { useNavigate } from 'react-router-dom'
import { useState } from "react";


function SearchForm() {
  const [searchData, setSearchData] = useState('');

  const navigate = useNavigate()

  const handleChange = (e) => {
    setSearchData(e.target.value);
  };

  const handleSubmit = (e) => {
    // prevent refresh page
    e.preventDefault();

    navigate(`/home/results/?query=${searchData}&page=0`)

  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="search"
        type="text"
        placeholder="Search"
        onChange={handleChange}
      />
      <button>Search</button>
    </form>
  );
}

export default SearchForm;
