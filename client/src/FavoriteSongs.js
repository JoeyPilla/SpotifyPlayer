import React, {useState} from "react";
import FetchFavoritesContainer from "./FetchFavoritesContainer";

export default function FavoriteSongs() {
  return (
    <div>
      <FetchFavoritesContainer
        term="long_term"
        type="tracks"
        title="Get Long Term Tracks"
      />
      <FetchFavoritesContainer
        term="medium_term"
        type="tracks"
        title="Get Medium Term Tracks"
      />
      <FetchFavoritesContainer
        term="short_term"
        type="tracks"
        title="Get Short Term Tracks"
      />
    </div>
  );
}