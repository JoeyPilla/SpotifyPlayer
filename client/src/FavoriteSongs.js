import React, {useState} from "react";
import FetchFavoritesContainer from "./FetchFavoritesContainer";
import styled from "styled-components"

export default function FavoriteSongs({email}) {
  const [term, setTerm] = useState("long_term")
  return (
    <>
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
  Height: 50px;
  background-color: #222326;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
  width: 150px;
  :hover {
   background-color:#595959;
  }
  .active {
    color: red;
  }
`;