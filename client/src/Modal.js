import React from 'react';
import styled from 'styled-components';

export default function Modal({ children, loggedIn }) {
  if (loggedIn) {
    return (
       <></>
     )
  }
  return (

    <Container>
      <Background/>
      {children}
    </Container>
  )
}
const Container = styled.div`
  z-index: 100;
  display:grid;
  width:100%;
  height:100%;
  grid-row: 1;
  grid-column: 1;  
`
const Background = styled.div`
  z-index: 100;
  display:grid;
  width:100%;
  height:100%;
  grid-row: 1;
  grid-column: 1;
  background: rgb(0, 0, 0);
  opacity: 0.5;
  filter: Alpha(Opacity=50);  
`