import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import SearchBar from "./searchbar.js";

const PEXELS_API_KEY =
  "API KEY";
const PEXELS_API_URL = "https://api.pexels.com/v1/curated";

function PhotoGallery() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(PEXELS_API_URL, {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
        params: {
          per_page: 80,
          page,
        },
      })
      .then((response) => {
        setPhotos([...photos, ...response.data.photos]);
        setHasMore(response.data.next_page !== null);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setHasMore(false);
        setIsLoading(false);
      });
  }, [page]);

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    )
      return;
    setPage(page + 1);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, isLoading]);

  return (
    <div>
      <SearchBar setPhotos={setPhotos} />
      <InfiniteScroll
        dataLength={photos.length}
        next={handleScroll}
        hasMore={hasMore}
        loader={<p>Loading...</p>}
      >
        <div>
          <ResponsiveMasonry
            ColumnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
          >
            <Masonry>
              {photos.map((photo, i) => (
                <img
                  key={i}
                  src={photo.src.large}
                  style={{ width: "100%", display: "block" }}
                />
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default PhotoGallery;
