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

export default function Home({term, type, title}) {
  const [data, setData] = useState({songs: [], artists: []});

  //console.log(long, medium, short);
  var dataArray = []
  if (data && type === "tracks") {
    dataArray = data.songs.map((song) => {
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
  } else if(data && type === "artists") {
    dataArray = data.artists.map((artist) => {
      return (
        <li>
          <p>
          {`Artist: ${artist.artist}`}
          </p><p>
          {`Genre: ${artist.genres.toString()}`}
          </p>
        </li>
      )
    })
  }

  return (
    <div>
      <button onClick={() => {
        fetch(`/topSongs?term=${term}&type=${type}`)
          .then(function (response) {
            if (response.status === 500) {
              return response.status
            } else {
              return response.json();
            }
          }).then(function (data) {
            console.log(data);
            setData(data)
          });
      }}>
        {title}
      </button>
      <div>
        Top {type} {term.split("_")[0]} term:
        <ol>
          {dataArray}
        </ol>
      </div>
    </div>
  );
}