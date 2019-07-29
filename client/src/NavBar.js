import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import styled from "styled-components"
import LoginCard from './LoginCard';
import { useTransition, animated } from 'react-spring';
export default function NavBar({ }) {
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
          <NavContainer style={props}>
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

const NavContainer = styled(animated.div)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  Height: 50px;
  background-color: #222326;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`
const NavLeft = styled.div`
  display: flex;
  flex-direction: row;
  color: white;
  Height: 50px;
`
const NavRight = styled.div`
  color: white;
  Height: 50px;
  justify-self: flex-end;
`
const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const StyledLink = styled(Link)`
  color: white;
  display: block;
  font-family: Helvetica, Arial, sans-serif;
  text-decoration: none;
  :hover {
   background-color:#595959;
  }
  .active {
    color: red;
  }
`;
const NavElement = styled.div`
  ${props => props.selected ? "background-color:#595959" : ""}
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Helvetica, Arial, sans-serif;
  width: 150px;
  :hover {
   background-color:#595959;
  }
  .active {
    color: red;
  }
`;