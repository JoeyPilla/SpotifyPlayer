import React, { Component } from "react";
import { authEndpoint, clientId, redirectUri, scopes } from "./config";
import hash from "./hash";
import styled from "styled-components"
import Spotify from './Spotify_Logo_RGB_Green.png';

export default class SpotifyLogin extends Component {
  render() {
    return (
      <>

          <Spoti>
            <H1>Login with Spotify</H1>
            <a
              className="btn btn--loginApp-link"
              href={`${authEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${encodeURIComponent(scopes)}`}
            >
              <SpotifyButton src={Spotify}/>
            </a>
          </Spoti>
      </>
    );
  }
}

const SpotifyButton = styled.img`
  border: none;
  border-radius: 5px;
  color: white;
  text-decoration: none;
  font-family: Helvetica, Arial, sans-serif;
  margin-right:15px;
  margin-left:15px;
  margin-Bottom:15px;
  padding: 5px 5px 15px 5px;
  width: 50%;
  .active {
    background-color:#595959;
  }
`
const Spoti = styled.div`
  display: flex;
  flex-direction: column;
  text-justify: center;
  justify-items: center;
  align-items:space-around;
  text-align: center;
  font-size: .9em;
    font-family: Helvetica, Arial, sans-serif;
`

const H1 = styled.h1`
  font-family: 'Montserrat', sans-serif;
`