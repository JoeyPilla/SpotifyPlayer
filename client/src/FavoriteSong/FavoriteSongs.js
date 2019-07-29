import React, {useState, useEffect} from "react";
import FetchFavoritesContainer from "../Favorites/FetchFavoritesContainer";
import { useTransition } from 'react-spring';
import FavoritesNavBar from '../Components/Navigation/FavoritesNavBar';

export default function FavoriteSongs({ email }) {
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
  const [visible, setVisible] = useState(true);

  useEffect(
    () => {
      const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 100);
        setPrevScrollPos(currentScrollPos);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    },
    [prevScrollPos, visible]
  );

  const transitions = useTransition(visible, null, {
  from: { opacity: 0 },
  enter: { opacity: 1 },
  leave: { opacity: 0 },
  })



  const [term, setTerm] = useState("long_term")
  return (
    <>
      {transitions.map(({ item, key, props }) =>
        item &&
        <FavoritesNavBar
          style={props}
          term={term}
          setTerm={setTerm}
        />
  )}
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