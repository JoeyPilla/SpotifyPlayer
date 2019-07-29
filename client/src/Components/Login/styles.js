import styled from 'styled-components';

export const LoginContainer = styled.div`
grid-row: 1;
grid-column: 1;
z-index: 101;
display: flex;
align-items: center;
justify-content: center;
align-self: center;
justify-self: center;
background-color: #ffffff;
height: 50%;
width: 50%;
border-radius: 10px;
`;

export const SpotifyButton = styled.img`
  border: none;
  border-radius: 5px;
  color: white;
  text-decoration: none;
  font-family: Helvetica, Arial, sans-serif;
  margin-right:15px;
  margin-left:15px;
  margin-Bottom:15px;
  padding: 5px 5px 15px 5px;
  width: 50%;
  .active {
    background-color:#595959;
  }
`;

export const SpotifyContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-justify: center;
  justify-self: center;
  align-items:space-around;
  text-align: center;
  font-size: .9em;
    font-family: Helvetica, Arial, sans-serif;
`;

export const H1 = styled.h1`
  font-family: 'Montserrat', sans-serif;
`;