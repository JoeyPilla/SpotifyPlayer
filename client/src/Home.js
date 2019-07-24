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

export default function Home() {
  const [long, setLong] = useState({});
  const [medium, setMedium] = useState({});
  const [short, setShort] = useState({});

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