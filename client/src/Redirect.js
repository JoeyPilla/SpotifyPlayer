import React, {useState, useEffect} from "react";


function getCurrentSong() {
  fetch(`/currentSong`).then(function (response) {
    if (response.status === 500) {
      return  response.status
    } else {
      return response.json();
    }
  }).then(function (data) {
    console.log(data);
    if (typeof data !== 'number') {
      
    } else {

    }
  });
}

// x

export default function Redirect() {
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [scope, setScope] = useState('');
  const [tokenType, setTokenType] = useState('');
  const [long, setLong] = useState({});
  const [medium, setMedium] = useState({});
  const [short, setShort] = useState({});
  const [expiresIn, setExpiresIn] = useState(0);
  const [error, setError] = useState(false);
  useEffect(() => {
    fetch(`/redirect?${window.location.href.split('?')[1]}`).then(function (response) {
      if (response.status === 500) {
        return  response.json()
      } else {
        return response.json();
      }
    }).then(function (data) {
      if (typeof data !== 'number') {
        setAccessToken(data.access_token);
        setExpiresIn(data.expires_in);
        setRefreshToken(data.refresh_token)
        setScope(data.scope)
        setTokenType(data.token_type)
      } else {
        setError(true)
      }
    });
  }, []);
  //console.log(long, medium, short);
  var LongSongs = []
  var MediumSongs = []
  var ShortSongs = []
  var LongArtists = []
  var MediumArtists = []
  var ShortArtists = []
  if (long.songs) {
    LongSongs = long.songs.map((song, i) => {
      return (
        <li>
          <div>
          {`Name: ${song.track}`}
          {`Artist: ${song.artists.toString()}`}
          {`Album: ${song.album}`}
          </div>
        </li>
      )
    })
    LongArtists = long.artists.map((artist, i) => {
      return (
        <li>{`Artist: ${artist.artist}, Genre: ${artist.genres.toString()}`}</li>
      )
    })
    }
  if (medium.songs) {
    MediumSongs = medium.songs.map((song, i) => {
      return (
        <li>{`Name: ${song.track}, Artist: ${song.artists.toString()}, Album: ${song.album}`}</li>
      )
    })
    MediumArtists = medium.artists.map((artist, i) => {
      return (
        <li>{`Artist: ${artist.artist}, Genre: ${artist.genres.toString()}`}</li>
      )
    })
  }
  if (short.songs) {
    ShortSongs = short.songs.map((song, i) => {
      return (
        <li>{`Name: ${song.track}, Artist: ${song.artists.toString()}, Album: ${song.album}`}</li>
      )
    })
    ShortArtists = short.artists.map((artist, i) => {
      return (
        <li>{`Artist: ${artist.artist}, Genre: ${artist.genres.toString()}`}</li>
      )
    })
  }
  if (error) {
    return <div>
      ERROR
    </div>
  }

  return (
    <div>
      <button onClick={() => {
        getCurrentSong();
        fetch(`/topSongs`).then(function (response) {
          if (response.status === 500) {
            return  response.status
          } else {
            return response.json();
          }
        }).then(function (data) {
          setLong(data.long)
          setMedium(data.medium)
          setShort(data.short)
        });
      }
      }>
        press to get current song
      </button>
      <div>
      Top Songs Long Term
      <ol>
      {LongSongs}
      </ol>
      </div>
      <div>
      Top Songs Medium Term
      <ol>
      {MediumSongs}
      </ol>
      </div>
      <div>
      Top Songs Short Term
      <ol>
      {ShortSongs}
      </ol>
      </div>
      <div>
      Top Artists Long Term
      <ol>
      {LongArtists}
      </ol>
      </div>
      <div>
      Top Artists Medium Term
      <ol>
      {MediumArtists}
      </ol>
      </div>
      <div>
      Top Artists Short Term
      <ol>
      {ShortArtists}
      </ol>
      </div>
    </div>
  );
}