import React, {useState, useEffect} from "react";
import { useTransition } from 'react-spring';
import { NavContainer, StyledButton, NavElement } from './styles';

export default function FavoritesNavBar({ term, setTerm }) {
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
  const [visible, setVisible] = useState(true);

  useEffect(
    () => {
      const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 100);
        setPrevScrollPos(currentScrollPos);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    },
    [prevScrollPos, visible]
  );

  const transitions = useTransition(visible, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    <>
      {transitions.map(({ item, key, props }) =>
        item &&
        <NavContainer style={props}>
          <NavElement selected={term === "long_term"}>
            <StyledButton
              onClick={() => setTerm("long_term")}>
              Long Term
            </StyledButton>
          </NavElement>
          <NavElement selected={term === "medium_term"}>
            <StyledButton
              onClick={() => setTerm("medium_term")}>
              Medium Term
            </StyledButton>
          </NavElement>
          <NavElement selected={term === "short_term"}>
            <StyledButton
              onClick={() => setTerm("short_term")}>
              Short Term
            </StyledButton>
          </NavElement>
        </NavContainer>
      )}
    </>
  );
}