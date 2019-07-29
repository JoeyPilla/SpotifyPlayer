import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from '../Navigation/NavBar';
import Redirect from '../Login/Redirect';
import FavoriteArtists from '../Favorites/FavoriteArtist/FavoriteArtists';
import FavoriteSongs from '../Favorites/FavoriteSong/FavoriteSongs';
import Modal from '../Modal/Modal';
import LoginCard from '../Login/LoginCard';
import { Container, ContentContainer } from './styles';



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

export default function AppRouter() {
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