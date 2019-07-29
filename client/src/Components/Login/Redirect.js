import React, {useState, useEffect} from "react";

function fetchRedirect(setEmail, setImageUrl, setLoggedIn, setError) {
  fetch(`/redirect?${window.location.href.split('?')[1]}`).then(function (response) {
    if (response.status === 500) {
      setError(true)
      return  response.json()
    } else {
      return response.json()
    }
  }).then(function (data) {
  setEmail(data.email)
  setImageUrl(data.imageUrl)
  setLoggedIn(true)
  });
}

export default function Redirect({setEmail, setImageUrl, setLoggedIn}) {
  const [error, setError] = useState(false);
  useEffect(() => {
    fetchRedirect(setEmail, setImageUrl, setLoggedIn, setError)
  }, [setEmail, setImageUrl, setLoggedIn]);
  if (error) {
    return <h1>ERROR</h1>
  }
  return (
    <>
    </>
  );
}