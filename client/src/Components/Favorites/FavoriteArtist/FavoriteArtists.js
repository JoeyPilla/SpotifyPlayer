import React, {useState, useEffect} from "react";
import FetchFavoritesContainer from "../FetchFavoritesContainer";
import styled from "styled-components"
import { useTransition, animated } from 'react-spring';
import FavoritesNavBar from '../../Navigation/FavoritesNavBar';

export default function FavoriteArtists({email}) {
  const [term, setTerm] = useState("long_term");

  return (
    <>
        <FavoritesNavBar
        term={term}
        setTerm={setTerm}
      />
      <div>
        <FetchFavoritesContainer
            term={term}
            type="artists"
            email={email}
        />
      </div>
    </>
  );
}