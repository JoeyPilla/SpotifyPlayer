import React from 'react';
import { Container, Background } from './styles';

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