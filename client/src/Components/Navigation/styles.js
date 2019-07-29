import styled from 'styled-components';
import { animated } from 'react-spring';
import { Link } from "react-router-dom";

export const NavContainer = styled(animated.div)`
position: fixed;
top: 50;
left: 0;
z-index: 50;
Height: 50px;
background-color: #222326;
display: flex;
flex-direction: row;
justify-content: center;
width: 100%;
`

export const StyledButton = styled.button`
color: white;
cursor: pointer;
background-color: rgba(0,0,0,0);
border: none;
color: white;
display: inline-block;
font-family: Helvetica, Arial, sans-serif;
text-align: center;
text-decoration: none;
:hover {
 background-color:#595959;
 cursor: pointer;
}
`;

export const NavElement = styled.div`
${props => props.selected ? "background-color:#595959" : ""}
align-items: center;
color: white;
display: flex;
font-family: Helvetica, Arial, sans-serif;
justify-content: center;
padding-right: 5px;
:hover {
 background-color:#595959;
}
`;

export const NavLeft = styled.div`
  display: flex;
  flex-direction: row;
  color: white;
  Height: 50px;
`
export const NavRight = styled.div`
  color: white;
  Height: 50px;
  justify-self: flex-end;
`
export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

export const StyledLink = styled(Link)`
  color: white;
  display: block;
  font-family: Helvetica, Arial, sans-serif;
  text-decoration: none;
  padding: 10px;
  :hover {
   background-color:#595959;
  }
  .active {
    color: red;
  }
`;