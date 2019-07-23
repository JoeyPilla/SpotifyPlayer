import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SpotifyLogin from './spotifyLogin';
import Redirect from './Redirect';



function AppRouter() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about/">About</Link>
            </li>
            <li>
              <Link to="/users/">Users</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={SpotifyLogin} />
        <Route path="/redirect" component={Redirect} />
      </div>
    </Router>
  );
}

export default AppRouter;