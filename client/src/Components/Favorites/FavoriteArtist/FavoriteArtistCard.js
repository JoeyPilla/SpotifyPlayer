import React from "react";
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
} from '../styles';

export default function FavoriteArtistCard({
  albumArt,
  count,
  genres,
  name,
  nameUrl,
}) {
  return (
    <ElementContainer>
    <Element>
    <AlbumArt src={albumArt} />
    <Info>
      <Count>{count+1}</Count>
      <DataContainer>
        <Name
          href={nameUrl}>
          {`${name}`}
        </Name>
        <Artist>{`${genres}`}</Artist>
      </DataContainer>
    </Info>
      </Element>
      <BlurShadow src={albumArt}/>
    </ElementContainer>

  )
}