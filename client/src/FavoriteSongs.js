import React, {useState} from "react";
import FetchFavoritesContainer from "./FetchFavoritesContainer";
import styled from "styled-components"
import { FaBars } from 'react-icons/fa';

export default function FavoriteSongs({email}) {
  const [term, setTerm] = useState("long_term")
  const [clicked, setClicked] = useState(false);
  return (
    <>
      <StyledBar
            size={"20px"}
            onClick={() => setClicked(!clicked)} />
      {clicked ? (
        <NavContainer>
          <NavElement>
            <StyledButton
              onClick={() => setTerm("long_term")}>
              Long Term
            </StyledButton>
          </NavElement>
          <NavElement>
            <StyledButton
              onClick={() => setTerm("medium_term")}>
              Medium Term
            </StyledButton>
          </NavElement>
          <NavElement>
            <StyledButton
              onClick={() => setTerm("short_term")}>
              Short Term
            </StyledButton>
          </NavElement>
        </NavContainer>
      ) : (
        <></>
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

const NavContainer = styled.div`
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
  background-color: #222326; /* Green */
  border: none;
  color: white;
  display: inline-block;
  font-family: Helvetica, Arial, sans-serif;
  text-align: center;
  text-decoration: none;
  :hover {
   background-color:#595959;
  }
  .active {
    background-color:#595959;
  }
`;

const NavElement = styled.div`
  align-items: center;
  color: white;
  display: flex;
  font-family: Helvetica, Arial, sans-serif;
  justify-content: center;
  padding-right: 5px;
  :hover {
   background-color:#595959;
  }
  .active {
    color: red;
  }
`;
const StyledBar = styled(FaBars)`
  position: fixed;
  top: 50;
  left: 0;
  z-index: 55;
  padding: 10px;
`