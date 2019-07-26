import React, {useState} from "react";
import FetchFavoritesContainer from "./FetchFavoritesContainer";
import styled from "styled-components"

export default function FavoriteArtists({email}) {
  const [term, setTerm] = useState("long_term")
  return (
    <>
      <NavContainer>
          <NavElement>
          <StyledButton onClick={()=>setTerm("long_term")}>Long Term</StyledButton>
          </NavElement>
          <NavElement>
          <StyledButton onClick={()=>setTerm("medium_term")}>Medium Term</StyledButton>
          </NavElement>
          <NavElement>
          <StyledButton onClick={()=>setTerm("short_term")}>Short Term</StyledButton>
          </NavElement>
      </NavContainer>
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

const NavContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  background-color: #222326;
  Height: 50px;
`

const StyledButton = styled.button`
  background-color: #222326; /* Green */
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-family: Helvetica, Arial, sans-serif;

  :hover {
   background-color:#595959;
  }
  .active {
    background-color:#595959;
  }
`;
const NavElement = styled.div`
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