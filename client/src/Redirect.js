import React, {useState, useEffect} from "react";

export default function Redirect({setEmail, setImageUrl, setLoggedIn}) {
  const [error, setError] = useState(false);
  useEffect(() => {
    fetch(`/redirect?${window.location.href.split('?')[1]}`).then(function (response) {
        console.log(response);
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
  }, [setEmail, setImageUrl, setLoggedIn]);
  if (error) {
    return <h1>ERROR</h1>
  }
  return (
    <>
    </>
  );
}