import React, { useState } from "react";
import axios from "axios";

const PEXELS_API_KEY =
  "***REMOVED***";
const PEXELS_API_URL = "https://api.pexels.com/v1/search";

function SearchBar(props) {
  const [query, setQuery] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .get(PEXELS_API_URL, {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
        params: {
          query,
          per_page: 80,
        },
      })
      .then((response) => {
        props.setPhotos(response.data.photos);
      })
      .catch((error) => {
        console.error(error);
      });

    this.setPhotos = this.setPhotos.bind(this);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
