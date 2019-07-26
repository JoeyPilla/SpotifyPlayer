import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import NavBar from './NavBar';
import Redirect from './Redirect';
import FavoriteArtists from './FavoriteArtists';
import FavoriteSongs from './FavoriteSongs';
import styled from "styled-components";

function AppRouter() {
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loggedIn, setLoggedIn] = useState(false)
  useEffect(() => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    if (params.has('email')) {
      fetch(`/returningUser?email=${params.get('email')}`).then(function (response) {
        if (response.status === 500) {
          return  response.json()
        } else {
          return response.json();
        }
      }).then(function (data) {
        if (data["Type"]) {
          alert(data.Type)
        } else {
          setLoggedIn(true)
          setEmail(data.email)
          setImageUrl(data.imageUrl)
        }
        
      });
    }
  }, [imageUrl]);
  return (
    <Router>
      <NavBar imageUrl={imageUrl} setEmail={setEmail} email={email} setImageUrl={setImageUrl} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
      <ContentContainer>
        <Route path="/FavoriteArtists" exact render={(routeProps) => (<FavoriteArtists  {...routeProps} email={email}/>)}/>
        <Route
          path="/" exact render={(routeProps) => (<FavoriteSongs  {...routeProps} email={email}/>)}/>

        <Route path="/redirect"
          render={(routeProps) => (<Redirect  {...routeProps} setEmail={setEmail} setLoggedIn={setLoggedIn} setImageUrl={setImageUrl}/>)}
          />
      </ContentContainer>
    </Router>
  );
}
const ContentContainer = styled.div`
  left: 0;
  width:100%;
  margin-top: 50px;
  margin-left: 0;
`

export default AppRouter;