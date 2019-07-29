import React, {useState, useEffect} from "react";
import { useTransition } from 'react-spring';
import { NavContainer,NavLeft,StyledLink, NavElement } from './styles';
export default function NavBar() {
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
  const [visible, setVisible] = useState(true);
  const [selected, setSelected] = useState('songs');
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

  return (
    <>
      {
        transitions.map(({ item, key, props }) =>
        item &&
          <NavContainer style={{...props, top:0}}>
            <NavLeft>
              <>
                <NavElement selected={selected === "songs"}>
                  <StyledLink 
                    to="/"
                    onClick={
                      () => setSelected("songs")
                    }>
                    Favorite Songs
                </StyledLink>
                </NavElement>
                <NavElement selected={selected === "artists"}>
                  <StyledLink
                    to="/FavoriteArtists"
                    onClick={
                      () => setSelected("artists")
                    }>
                    Favorite Artists
                </StyledLink>
                </NavElement>
              </>
            </NavLeft>
          </NavContainer>
        )
      }
    </>
  )
}