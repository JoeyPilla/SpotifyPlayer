import React from "react";
import SpotifyLogin from './spotifyLogin';
import styled from "styled-components"


export default function LoginCard({ loggedIn}) {
  return (
    <LoginContainer>
        {!loggedIn && <SpotifyLogin />}
    </LoginContainer>
  );
}
const LoginContainer = styled.div`
  grid-row: 1;
  grid-column: 1;
  z-index: 101;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  justify-self: center;
  background-color: #ffffff;
  height: 50%;
  width: 50%;
  border-radius: 10px;
`