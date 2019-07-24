import React, {useState} from "react";
import FetchFavoritesContainer from "./FetchFavoritesContainer";

export default function FavoriteArtists() {
  return (
    <div>
      <FetchFavoritesContainer
        term="long_term"
        type="artists"
        title="Get Long Term Artists"
      />
      <FetchFavoritesContainer
        term="medium_term"
        type="artists"
        title="Get Medium Term Artists"
      />
      <FetchFavoritesContainer
        term="short_term"
        type="artists"
        title="Get Short Term Artists"
      />
    </div>
  );
}