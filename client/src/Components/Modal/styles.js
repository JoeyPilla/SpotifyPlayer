import styled from 'styled-components';

export const Container = styled.div`
z-index: 100;
display:grid;
width:100%;
height:100%;
grid-row: 1;
grid-column: 1;  
`;

export const Background = styled.div`
z-index: 100;
display:grid;
width:100%;
height:100%;
grid-row: 1;
grid-column: 1;
background: rgb(0, 0, 0);
opacity: 0.5;
filter: Alpha(Opacity=50);  
`;
