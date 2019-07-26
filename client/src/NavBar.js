import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SpotifyLogin from './spotifyLogin';
import styled from "styled-components"
import { FaBars } from 'react-icons/fa';
import LoginCard from './LoginCard';
export default function NavBar({ email, imageUrl, loggedIn, setEmail, setImageUrl, setLoggedIn }) {
  const [clicked, setClicked] = useState(false)
  return (
    <NavContainer>
        <NavLeft>
          <NavElement>
            <StyledLink to="/">Favorite Songs</StyledLink>
          </NavElement>
          <NavElement>
            <StyledLink to="/FavoriteArtists">Favorite Artists</StyledLink>
          </NavElement>
      </NavLeft>
      <NavRight>
        {
          loggedIn ? (
            <img  height= "50px" src={imageUrl}/>
          ) : (
              <MenuContainer>
                <StyledBar size="30px" onClick={() => setClicked(!clicked)}/>
                {
                  clicked ? (
                      <LoginCard setEmail={setEmail} email={email} setImageUrl={setImageUrl} loggedIn={loggedIn} setLoggedIn={setLoggedIn} setClicked={setClicked}/>
                  ) : (
                      null
                  )
                }
                </MenuContainer>
            )
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

const StyledBar = styled(FaBars)`
  padding: 10px;
  :hover {
    color: #222326;
    background-color: white;
  }
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