import React, {useState, useEffect} from "react";
import styled from "styled-components"


export default function FetchFavoritesContainer({ term, type, title, email }) {
  const [data, setData] = useState({songs: [], artists: []});
  useEffect(() => {
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
  }, [email, term, type]);

  //console.log(long, medium, short);
  var dataArray = []
  if (data && type === "tracks") {
    dataArray = data.songs.map((song, i) => {
      return (
        <Element>
          <AlbumArt src={song.AlbumArt[0]} />
          <Info>
            <Count>
              {i+1}
            </Count>
            <Info2>
              <Name>
                {`${song.track}`}
              </Name>
              <Artist>
                {`${song.artists.toString()}`}
              </Artist>
            </Info2>
          </Info>
        </Element>
      )
    })
  } else if(data && type === "artists") {
    dataArray = data.artists.map((artist, i) => {
      var genres = artist.genres.reduce((acc, current, i) => {
        if (i === 0) {
          return current
        }
       return acc + ", " + current
      }, "")
      return (
        <Element>
        <AlbumArt src={artist.AlbumArt} />
        <Info>
          <Count>
            {i+1}
          </Count>
          <Info2>
            <Name>
              {`${artist.artist}`}
            </Name>
            <Artist>
              {`${genres}`}
            </Artist>
          </Info2>
        </Info>
      </Element>
      )
    })
  }

  return (
        <Container>
          {dataArray}
        </Container>
  );
}

const Element = styled.div`
  display: flex;
  flex-direction: column;
  //background-color: white;
  border-radius: 10px;
  color:black;
  width: 300px;
  height: 325px;
  margin-bottom: 20px;
  background-color: #282828;
  justify-items: space-between;
`
const AlbumArt = styled.img`
  src: ${props => "url(" + props.url + ")"};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  height:85%;
  width:100%;
`
const Name = styled.div`
font-family: 'Open Sans', sans-serif;
font-size: 1em;
    text-overflow: ellipsis;
    overflow-x: hidden;
    overflow-y: hidden;
    white-space:nowrap;
    color: #ffffff;
`
const Artist = styled.div`
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
const Info = styled.div`
  display:flex;
  flex-direction: row;
  align-content: center;
  justify-self: center;
  padding: 5px;
  height:15%;
  width:100%;
`
const Info2 = styled.div`
  display:flex;
  flex-direction: column;
  align-content: center;
  justify-self: center;
  padding: 5px;
  width:85%;
`
const Count = styled.div`
  display:flex;
  font-family: 'Open Sans', sans-serif;
    font-size: 2em;
    color:#545454;
  flex-direction: column;
  align-content: center;
  justify-self: center;
`