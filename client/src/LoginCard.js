import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SpotifyLogin from './spotifyLogin';
import styled from "styled-components"


export default function LoginCard({setEmail, setImageUrl, loggedIn, setLoggedIn ,setClicked}) {
  const [value, setValue] = useState("")
  return (
    <LoginContainer>
      {/* <LoginContainer2>
        Returning User Login
      <Input placeholder={"email"} onChange={(e) => setValue(e.target.value)} />
      <SpotifyButton onClick={() => {
        fetch(`/returningUser?email=${value}`).then(function (response) {
          if (response.status === 500) {
            return  response.json()
          } else {
            return response.json();
          }
        }).then(function (data) {
          if (data["Type"]) {
            console.log(data);
            alert(data.Type)
          } else {
            setLoggedIn(true)
            setClicked(false)
            setEmail(data.email)
            setImageUrl(data.imageUrl)
          }
          
        });
      }}>Log in</SpotifyButton>
      </LoginContainer2> */}

        {!loggedIn && <SpotifyLogin />
      }
      </LoginContainer>
  );
}
const LoginContainer = styled.div`
z-index: 10;
float: right;
position: fixed; /*or fixed*/
    right: 0px;
    top:50px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
background-color: #222326;
height: 75px;
width: 215px;
border-bottom-left-radius: 10px;
border-bottom-right-radius: 10px;
`
const LoginContainer2 = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-top:10px;
text-align: center;
font-size: .9em;
  font-family: Helvetica, Arial, sans-serif;
`
const SpotifyButton = styled.button`
    background-color: #1ED760; /* Green */
  border: none;
  color: #595959;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-family: Helvetica, Arial, sans-serif;
  font-weight: bold;
  margin-right:15px;
  margin-left:15px;
  padding:10px;
  border-radius: 5px;
  margin-top: 5px;
  width: 50%
  :hover {
   background-color:#595959;
   color: #1ED760;
  }`


const Input = styled.input`
    background-color: #595959; /* Green */
  border: none;
  color: #1ED760;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-family: Helvetica, Arial, sans-serif;
  font-weight: bold;
  margin-right:15px;
  padding: 5px 10px 5px 10px;
  margin-left:15px;
  border-radius: 5px;
  margin-top: 5px;
  width: 75%;
  :hover {
   background-color:#595959;
   color: #1ED760;
  }
  .active {
    background-color:#595959;
  }
`