import React, {useRef, useState} from "react";
import styled from "styled-components"
import { FaRegPlayCircle, FaRegPauseCircle } from 'react-icons/fa';

export default function FavoriteSongCard({
  albumArt,
  artists,
  audioPreview,
  count,
  track
}) {
  const [playing, setPlaying] = useState(false)
  const audioEl = useRef();
  return (
    <Container>
      <audio ref={audioEl} src={audioPreview}/>
      { playing ? (
        <PauseCircle
          size={"75px"}
          onClick={() => {
            setPlaying(false);
            audioEl.current.pause();
          }
            
          } />
        ) : (<PlayCircle
        size={"75px"}
          onClick={() => {
            setPlaying(true);
            audioEl.current.play();
        }} />
      ) }
      <Element>
      <AlbumArt
        src={albumArt}
        audioPreview={audioPreview}/>
    <Info>
      <Count>{count+1}</Count>
      <DataContainer>
        <Name>{`${track}`}</Name>
        <Artist>{artists}</Artist>
      </DataContainer>
    </Info>
      </Element>
      <BlurShadow src={albumArt}/>
    </Container>
  )
}

const Element = styled.div`
  position: relative;
  top: 15px;
  left: 15px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  //background-color: white;
  border-radius: 10px;
  color:black;
  width: 300px;
  height: 325px;
  background-color: #282828;
  justify-items: space-between;
  grid-column: 1;
  grid-row: 1;
`


const PlayCircle = styled(FaRegPlayCircle)`
  grid-column: 1;
  grid-row: 1;
  justify-self: center;
  align-self: center;
 color: white;
  z-index:15;
  size: 10em;
  `

const PauseCircle = styled(FaRegPauseCircle)`
  grid-column: 1;
  grid-row: 1;
  justify-self: center;
  align-self: center;
 color: white;
  z-index:15;
  size: 10em;
  `
const BlurShadow = styled.img`
  -webkit-filter: blur(20px) opacity(50%);
  filter: blur(20px) opacity(50%);
  z-index: 0;
  border-radius: 10px;
  width: 325px;
  height: 350px;
  grid-column: 1;
  grid-row: 1;
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
const Container = styled.div`
  display: grid;  
  margin-right: 15px;
  margin-left: 15px;
  margin-bottom: 40px;
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