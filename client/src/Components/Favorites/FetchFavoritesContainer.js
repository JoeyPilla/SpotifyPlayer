import React, {useState, useEffect} from "react";
import FavoriteArtistCard from './FavoriteArtist/FavoriteArtistCard';
import FavoriteSongCard from './FavoriteSong/FavoriteSongCard';
import { Container, ArtistLink } from './styles';
import {Trail} from 'react-spring/renderprops';

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
        return (
          <ArtistLink
            key={song.artistsUrl[i]}
            href={song.artistsUrl[i]}>
            {artist}
          </ArtistLink>
        );
      });

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
      }, "");

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
      <Trail
        items={dataArray}
        from={{opacity: 0, transform: 'translate3d(0,-40px,0)' }}
        to={{opacity: 1, transform: 'translate3d(0,0px,0)' }}
      >
        {data => props => {
          return (
            <div style={props}>
              {data}
            </div>
          )
        }}
      </Trail>
    </Container>
  );
}