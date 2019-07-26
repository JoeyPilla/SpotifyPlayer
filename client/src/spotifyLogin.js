import React, { Component } from "react";
import { authEndpoint, clientId, redirectUri, scopes } from "./config";
import hash from "./hash";
import styled from "styled-components"
import Spotify from './Spotify_Logo_RGB_Green.png';
export default class SpotifyLogin extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      item: {
        album: {
          images: [{ url: "" }]
        },
        name: "",
        artists: [{ name: "" }],
        duration_ms:0,
      },
      is_playing: "Paused",
      progress_ms: 0
    };
  }
  componentDidMount() {
    // Set token
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token
      });
    }
  }

  render() {
    return (
      <>
          {!this.state.token && (
          <Spoti>
            Login
            <a
              className="btn btn--loginApp-link"
              href={`${authEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${encodeURIComponent(scopes)}`}
            >
              <SpotifyButton src={Spotify}/>
            </a>
              </Spoti>
          )}
          {this.state.token && (
            <h1>fdsa</h1>
          )}
      </>
    );
  }
}

const SpotifyButton = styled.img`
  border: none;
  border-radius: 5px;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-family: Helvetica, Arial, sans-serif;
  margin-right:15px;
  margin-left:15px;
  margin-Bottom:15px;
  padding: 5px 5px 15px 5px;
  height: 30px;
  text-align: center;
  text-justify: center;
  :hover {
   background-color:#595959;
  }
  .active {
    background-color:#595959;
  }
`
const Spoti = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: .9em;
    font-family: Helvetica, Arial, sans-serif;
`