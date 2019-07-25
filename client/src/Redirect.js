import React, {useState, useEffect} from "react";

export default function Redirect({username}) {
  const [error, setError] = useState(false);
  useEffect(() => {
    fetch(`/redirect?${window.location.href.split('?')[1]}&name=${username}`).then(function (response) {
      if (response.status === 500) {
        setError(true)
        return  response.json()
      } else {
        return response.json();
      }
    }).then(function (data) {
      console.log(data);
    });
  }, [username]);
  if (error) {
    return <h1>ERROR</h1>
  }
  return (
    <div>
      Successfully Logged in
    </div>
  );
}