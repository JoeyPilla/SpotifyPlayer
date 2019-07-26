import React from "react";
import SpotifyLogin from './spotifyLogin';
import styled from "styled-components"


export default function LoginCard({ loggedIn}) {
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