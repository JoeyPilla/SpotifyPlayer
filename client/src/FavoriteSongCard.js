import React from "react";
import styled from "styled-components"

export default function FavoriteSongCard({
  albumArt,
  artists,
  audioPreview,
  count,
  track
}) {
  var audio = new Audio(audioPreview);
  return (
    <Element>
      <AlbumArt
        src={albumArt}
        audioPreview={audioPreview}
        onClick={() => {
          audio.paused ? audio.play() : audio.pause();
        }}/>
    <Info>
      <Count>{count+1}</Count>
      <DataContainer>
        <Name>{`${track}`}</Name>
        <Artist>{artists}</Artist>
      </DataContainer>
    </Info>
  </Element>
  )
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
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  height:85%;
  width:100%;
`
const Name = styled.a`
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

const Info = styled.div`
  display:flex;
  flex-direction: row;
  align-content: center;
  justify-self: center;
  padding: 5px;
  height:15%;
  width:100%;
`
const DataContainer = styled.div`
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