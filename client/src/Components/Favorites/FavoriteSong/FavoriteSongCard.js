import React, {useRef, useState} from "react";
import {
  AlbumArt,
  Artist,
  BlurShadow,
  Count,
  DataContainer,
  Element,
  ElementContainer,
  Info,
  Name,
  PauseCircle, 
  PlayCircle,
} from '../styles'

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
    <ElementContainer>
      <audio ref={audioEl} src={audioPreview}/>
      {playing ? (
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
      )}
      <Element>
        <AlbumArt
          src={albumArt}
          audioPreview={audioPreview}/>
        <Info>
          <Count>{count+1}</Count>
          <DataContainer>
            {/* <Name>{`${track}`}</Name> */}
            <Artist>{artists}</Artist>
          </DataContainer>
        </Info>
      </Element>
      <BlurShadow src={albumArt}/>
    </ElementContainer>
  )
}