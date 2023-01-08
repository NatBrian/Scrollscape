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
  }

  return (
    <div>
      <form onSubmit={handleSubmit} class="field has-addons">
        <p class="control is-expanded">
          <input
            class="input"
            type="text"
            placeholder="Japanese sakura blossom"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </p>
        <p class="control">
          <button type="submit" class="button is-black">
            <span>Search</span>
            <span class="icon is-small">
              <i class="fas fa-search"></i>
            </span>
          </button>
        </p>
      </form>
    </div>
  );
}

export default SearchBar;
