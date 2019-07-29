import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from './NavBar';
import Redirect from './Redirect';
import FavoriteArtists from './FavoriteArtists';
import FavoriteSongs from './FavoriteSongs';
import styled from "styled-components";
import Modal from './Modal';
import LoginCard from './LoginCard';

function fetchReturningUser(setLoggedIn, setEmail, setImageUrl) {
  let params = new URLSearchParams(window.location.search);
  if (params.has('email')) {
    fetch(`/returningUser?email=${params.get('email')}`).then(function (response) {
      response.json().then(function (data) {
        if (data["Type"]) {
          alert(data.Type)
        } else {
          setLoggedIn(true)
          setEmail(data.email)
          setImageUrl(data.imageUrl)
        }
      });
    });
  }
}

function AppRouter() {
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loggedIn, setLoggedIn] = useState(false)
  useEffect(() => {
    fetchReturningUser(setLoggedIn, setEmail,setImageUrl)
  }, []);
  return (
    <Container>
    <Modal loggedIn={loggedIn}>
        <LoginCard
          setEmail={setEmail}
          email={email}
          setImageUrl={setImageUrl}
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}/>
    </Modal>
    <Router>
      <NavBar/>
      <ContentContainer>
        <Route
          exact
          path="/FavoriteArtists"
          render={(routeProps) => (
            <FavoriteArtists
              {...routeProps}
              email={email}/>
          )}/>
        <Route
          exact
          path="/"
          render={(routeProps) => (
            <FavoriteSongs
              {...routeProps}
              email={email} />
          )}/>
        <Route
          path="/redirect"
          render={(routeProps) => (
            <Redirect
              {...routeProps}
              setEmail={setEmail}
              setLoggedIn={setLoggedIn}
              setImageUrl={setImageUrl} />
          )}/>
      </ContentContainer>
      </Router>
    </Container>
  );
}
const ContentContainer = styled.div`
  left: 0;
  width:100%;
  margin-top: 50px;
  margin-left: 0;
  grid-row: 1;
  grid-column: 1;
`
const Container = styled.div`
display: grid;
height: 100vh;
width: 100vw;
`

export default AppRouter;