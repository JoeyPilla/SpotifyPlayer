import React from "react";
import SpotifyLogin from './spotifyLogin';
import { LoginContainer } from './styles';

export default function LoginCard({ loggedIn}) {
  return (
    <LoginContainer>
        {!loggedIn && <SpotifyLogin />}
    </LoginContainer>
  );
}