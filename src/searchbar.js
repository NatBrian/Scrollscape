import React, { useState } from "react";
import axios from "axios";

const PEXELS_API_KEY =
  "API KEY";
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
      <form onSubmit={handleSubmit} className="field has-addons">
        <p className="control is-expanded">
          <input
            className="input"
            type="text"
            placeholder="Search trending photos..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </p>
        <p className="control">
          <button type="submit" className="button is-black">
            <span>Search</span>
            <span className="icon is-small">
              <i className="fas fa-search"></i>
            </span>
          </button>
        </p>
      </form>
    </div>
  );
}

export default SearchBar;
