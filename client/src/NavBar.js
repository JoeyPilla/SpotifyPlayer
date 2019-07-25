import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SpotifyLogin from './spotifyLogin';
import styled from "styled-components"


export default function NavBar() {
  const [loggedIn, setLoggedIn] = useState(false)
  useEffect(() => {
    fetch(`/returningUser`).then(function (response) {
      if (response.status === 500) {
        return  response.text()
      } else {
        return response.text();
      }
    }).then(function (data) {
      if (data === "Success") {
        console.log(data);
        setLoggedIn(true)
      }
    });
  }, []);
  return (
      <NavContainer>
        <NavLeft>
          <NavElement>
            <StyledLink to="/">Home</StyledLink>
          </NavElement>
          <NavElement>
            <StyledLink to="/FavoriteSongs/">Favorite Songs</StyledLink>
          </NavElement>
          {/* <NavElement>
            <StyledLink to="/FavoriteArtists/">Favorite Artists</StyledLink>
          </NavElement> */}
        </NavLeft>
        <NavRight>
          {!loggedIn &&
            <NavElement>
              <SpotifyLogin />
            </NavElement>
          }
        </NavRight>

       
      </NavContainer>
  );
}

const NavContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #222326;
  Height: 50px;
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