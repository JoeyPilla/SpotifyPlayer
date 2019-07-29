import React, {useState, useEffect} from "react";
import FetchFavoritesContainer from "./FetchFavoritesContainer";
import styled from "styled-components"
import { FaBars } from 'react-icons/fa';
import { useTransition, animated } from 'react-spring';

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
        <NavContainer style={props}>
          <NavElement selected={term === "long_term"}>
            <StyledButton
              onClick={() => setTerm("long_term")}>
              Long Term
            </StyledButton>
          </NavElement>
          <NavElement selected={term === "medium_term"}>
            <StyledButton
              onClick={() => setTerm("medium_term")}>
              Medium Term
            </StyledButton>
          </NavElement>
          <NavElement selected={term === "short_term"}>
            <StyledButton
              onClick={() => setTerm("short_term")}>
              Short Term
            </StyledButton>
          </NavElement>
        </NavContainer>
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

const NavContainer = styled(animated.div)`
  position: fixed;
  top: 50;
  left: 0;
  z-index: 50;
  Height: 50px;
  background-color: #222326;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`

const StyledButton = styled.button`
  color: white;
  cursor: pointer;
  background-color: rgba(0,0,0,0);
  border: none;
  color: white;
  display: inline-block;
  font-family: Helvetica, Arial, sans-serif;
  text-align: center;
  text-decoration: none;
  :hover {
   background-color:#595959;
   cursor: pointer;
  }
`;

const NavElement = styled.div`
  ${props => props.selected ? "background-color:#595959" : ""}
  align-items: center;
  color: white;
  display: flex;
  font-family: Helvetica, Arial, sans-serif;
  justify-content: center;
  padding-right: 5px;
  :hover {
   background-color:#595959;
  }
`;

const StyledBar = styled(FaBars)`
  position: fixed;
  top: 50;
  left: 0;
  z-index: 55;
  padding: 10px;
`