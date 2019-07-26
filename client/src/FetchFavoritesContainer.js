import React, {useState, useEffect} from "react";
import styled from "styled-components";
import FavoriteArtistCard from './FavoriteArtistCard';
import FavoriteSongCard from './FavoriteSongCard';

function getTopSongs(term, type, email, setData) {
  fetch(`/topSongs?term=${term}&type=${type}&email=${email}`)
  .then(function (response) {
      return response.json();
  }).then(function (data) {
    if (data["Type"]) {
      console.log(data);
    } else {
      setData(data)
    }
  });
}

export default function FetchFavoritesContainer({
  email,
  term,
  type,
}) {
  const [data, setData] = useState({songs: [], artists: []});

  useEffect(() => {
    getTopSongs(term, type, email, setData)
  }, [email, term, type]);

  var dataArray = []
  if (data && type === "tracks") {
    dataArray = data.songs.map((song, i) => {
      const artists = song.artists.map((artist, i) => {
        return (<ArtistLink
          key={song.artistsUrl[i]}
          href={song.artistsUrl[i]}>
          {artist}
        </ArtistLink>)
      })
      return (
        <FavoriteSongCard
          key={song.track+song.albumArt[0]}
          albumArt={song.albumArt[0]}
          artists={artists}
          audioPreview={song.audioPreview}
          count={i}
          track={song.track}
        />
      )
    })
  } else if(data && type === "artists") {
    dataArray = data.artists.map((artist, i) => {
      var genres = artist.genres.reduce((acc, current, i) => {
        var value = "";
        i === 0 ? value = current : value = acc + ", " + current;
        return value;
      }, "")
      return (
        <FavoriteArtistCard
          key={artist.artist}
          albumArt={artist.albumArt}
          count={i + 1}
          genres={genres}
          name={artist.artist}
          nameUrl={artist.artistUrl}
        />
      )
    })
  }

  return (
        <Container>
          {dataArray}
        </Container>
  );
}


const ArtistLink = styled.a`
    font-family: 'Open Sans', sans-serif;
    font-size: .75em;
    text-overflow: hidden;
    overflow-x: hidden;
    overflow-y: hidden;
    white-space:nowrap;
    color: #b3b3b3;
`
const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding-top: 10px;
`