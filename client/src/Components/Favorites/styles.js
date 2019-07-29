import styled from 'styled-components';
import { FaRegPlayCircle, FaRegPauseCircle } from 'react-icons/fa';

export const ArtistLink = styled.a`
font-family: 'Open Sans', sans-serif;
font-size: .75em;
text-overflow: hidden;
overflow-x: hidden;
overflow-y: hidden;
white-space:nowrap;
color: #b3b3b3;
`;

export const Container = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: space-evenly;
padding-top: 2%;
padding-right: 2%;
margin-top: 25px;
`;

export const Element = styled.div`
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
`;

export const PlayCircle = styled(FaRegPlayCircle)`
  grid-column: 1;
  grid-row: 1;
  justify-self: center;
  align-self: center;
 color: white;
  z-index:15;
  size: 10em;
  `;

export const PauseCircle = styled(FaRegPauseCircle)`
  grid-column: 1;
  grid-row: 1;
  justify-self: center;
  align-self: center;
 color: white;
  z-index:15;
  size: 10em;
  `;

export const BlurShadow = styled.img`
  -webkit-filter: blur(20px) opacity(50%);
  filter: blur(20px) opacity(50%);
  z-index: 0;
  border-radius: 10px;
  width: 325px;
  height: 350px;
  grid-column: 1;
  grid-row: 1;
`;


export const AlbumArt = styled.img`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  height:85%;
  width:100%;
`;

export const Name = styled.a`
font-family: 'Open Sans', sans-serif;
font-size: 1em;
    text-overflow: ellipsis;
    overflow-x: hidden;
    overflow-y: hidden;
    white-space:nowrap;
    color: #ffffff;
`;

export const Artist = styled.div`
    font-family: 'Open Sans', sans-serif;
    font-size: .75em;
    text-overflow: hidden;
    overflow-x: hidden;
    overflow-y: hidden;
    white-space:nowrap;
    color: #b3b3b3;
`;

export const ElementContainer = styled.div`
  display: grid;  
  margin-right: 15px;
  margin-left: 15px;
  margin-bottom: 40px;
`;


export const Info = styled.div`
  display:flex;
  flex-direction: row;
  align-content: center;
  justify-self: center;
  padding: 5px;
  height:15%;
  width:100%;
`;

export const DataContainer = styled.div`
  display:flex;
  flex-direction: column;
  align-content: center;
  justify-self: center;
  padding: 5px;
  width:85%;
`;

export const Count = styled.div`
  display:flex;
  font-family: 'Open Sans', sans-serif;
    font-size: 2em;
    color:#545454;
  flex-direction: column;
  align-content: center;
  justify-self: center;
`;
