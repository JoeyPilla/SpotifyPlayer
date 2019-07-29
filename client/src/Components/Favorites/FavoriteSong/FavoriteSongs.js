import React, {useState} from "react";
import FetchFavoritesContainer from "../FetchFavoritesContainer";
import FavoritesNavBar from '../../Navigation/FavoritesNavBar';

export default function FavoriteSongs({ email }) {
  const [term, setTerm] = useState("long_term")
  return (
    <>
      <FavoritesNavBar
        term={term}
        setTerm={setTerm}
      />
      <div>
        <FetchFavoritesContainer
          term={term}
          type="tracks"
          email={email}
        />
      </div>
    </>
  );
}