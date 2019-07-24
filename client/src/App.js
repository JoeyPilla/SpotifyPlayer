import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import NavBar from './NavBar';
import Redirect from './Redirect';
import Home from './Home';
import FavoriteArtists from './FavoriteArtists';
import FavoriteSongs from './FavoriteSongs';
import styled from "styled-components"


function AppRouter() {
  return (
    <Router>
      <NavBar />
      <ContentContainer>
      <Route path="/" exact component={Home} />
        <Route path="/FavoriteArtists" exact component={FavoriteArtists} />
        <Route path="/FavoriteSongs" exact component={FavoriteSongs} />
        <Route path="/redirect" component={Redirect} />
      </ContentContainer>
    </Router>
  );
}
const ContentContainer = styled.div`
  margin-top: 50px;
`

export default AppRouter;