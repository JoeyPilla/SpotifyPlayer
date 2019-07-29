import React, { Component } from "react";
import {
  authEndpoint,
  clientId,
  redirectUri,
  scopes
} from "../../config";
import Spotify from './Spotify_Logo_RGB_Green.png';
import {
  SpotifyButton,
  SpotifyContainer,
  H1,
} from './styles';

export default class SpotifyLogin extends Component {
  render() {
    return (
      <>

          <SpotifyContainer>
            <H1>Login with Spotify</H1>
            <a
              className="btn btn--loginApp-link"
              href={`${authEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${encodeURIComponent(scopes)}`}
            >
              <SpotifyButton src={Spotify}/>
            </a>
          </SpotifyContainer>
      </>
    );
  }
}