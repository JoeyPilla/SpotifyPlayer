import React, {useState, useEffect} from "react";


function getCurrentSong() {
  fetch(`/currentSong`).then(function (response) {
    if (response.status === 500) {
      return  response.status
    } else {
      return response.json();
    }
  }).then(function (data) {
    console.log(data);
    if (typeof data !== 'number') {
      
    } else {

    }
  });
}

export default function Redirect() {
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [scope, setScope] = useState('');
  const [tokenType, setTokenType] = useState('');
  const [expiresIn, setExpiresIn] = useState(0);
  const [error, setError] = useState(false);
  useEffect(() => {
    fetch(`/redirect?${window.location.href.split('?')[1]}`).then(function (response) {
      if (response.status === 500) {
        return  response.json()
      } else {
        return response.json();
      }
    }).then(function (data) {
      if (typeof data !== 'number') {
        setAccessToken(data.access_token);
        setExpiresIn(data.expires_in);
        setRefreshToken(data.refresh_token)
        setScope(data.scope)
        setTokenType(data.token_type)
      } else {
        setError(true)
      }
    });
  }, []);
  if (error) {
    return <div>
      ERROR
    </div>
  }

  return (
    <div>
      <button onClick={() => getCurrentSong()}>
        press to get current song
      </button>
    </div>
  );
}