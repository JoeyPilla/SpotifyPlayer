import React, {useState, useEffect} from "react";
import FavoriteArtistCard from './FavoriteArtist/FavoriteArtistCard';
import FavoriteSongCard from './FavoriteSong/FavoriteSongCard';
import { Container, ArtistLink } from './styles';
import { useTrail, animated, config } from 'react-spring';

function getTopSongs(term, type, email, setData) {
  fetch(`/topSongs?term=${term}&type=${type}&email=${email}`)
  .then(function (response) {
      return response.json();
  }).then(function (data) {
    console.log(data);
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

  var dataArray = [];
  if (data && type === "tracks") {
    dataArray = data.songs.map((song, i) => {
      const artists = song.artists.map((artist, i) => {
        return (
          <ArtistLink
            key={artist.href}
            href={artist.external_urls.spotify}>
            {artist.name}
          </ArtistLink>
        );
      });
      return (
        <FavoriteSongCard
          key={song.name+song.album.images[0]}
          albumArt={song.album.images[0].URL}
          artists={artists}
          audioPreview={song.preview_url}
          count={i}
          track={song.name}
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

  const trail = useTrail(dataArray.length, {
    from: { opacity: 0, transform: 'scale(0.4)' },
    to: { opacity: 1, transform: 'scale(1)' }
  })


  return (
    <Container>
      {trail.map((props, index) => {
        return (
          <animated.div style={props}>
            {dataArray[index]}
          </animated.div>
        )
      })}
    </Container>
  );
}