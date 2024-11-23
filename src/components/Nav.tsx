import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledNav = styled.nav`
  background-color: #f5f5f5;
  font-family: "Roboto", sans-serif;
  font-size: 1.5rem;
  padding: 0 4.5rem;
  display: flex;
  gap: 1rem;
  justify-content: space-between;

  @media (max-width: 62.5em) {
    padding: 0 1rem;
  }

  @media (max-width: 56.5em) {
    font-size: 1rem;
  }

  img {
    /* height: 4rem; */
    width: 4rem;
  }
`;

const StyledNavLink = styled(NavLink)`
  border-bottom: 2px solid transparent;
  padding: 0.4rem 0 0.2rem;
  color: inherit;
  text-decoration: none;

  &:hover,
  &.active {
    border-bottom: 2px solid black;
  }
`;

const NavPages = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 62.5em) {
  }

  @media (max-width: 37.5em) {
    gap: 1rem;
  }
`;

const NavServices = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const About = styled(StyledNavLink)`
  display: flex;
  align-items: center;

  img {
    width: 3rem;
  }
`;

export default function Nav() {
  return (
    <StyledNav>
      <NavPages>
        <StyledNavLink to="/">Personal</StyledNavLink>
        <StyledNavLink to="/small-business" onClick={(e) => e.preventDefault()}>
          Small business
        </StyledNavLink>
        <StyledNavLink
          to="/wealth-management"
          onClick={(e) => e.preventDefault()}
        >
          Wealth Mangement
        </StyledNavLink>
        <StyledNavLink
          to="/business-institutions"
          onClick={(e) => e.preventDefault()}
        >
          Business & Institutions
        </StyledNavLink>
        <StyledNavLink to="/security" onClick={(e) => e.preventDefault()}>
          Security
        </StyledNavLink>
        <About to="/about" onClick={(e) => e.preventDefault()}>
          <img src="icon.png" alt="" /> About Us
        </About>
      </NavPages>
      <NavServices>
        <StyledNavLink to="language" onClick={(e) => e.preventDefault()}>
          En español
        </StyledNavLink>
        <StyledNavLink to="contact-us" onClick={(e) => e.preventDefault()}>
          Contact Us
        </StyledNavLink>
        <StyledNavLink to="help" onClick={(e) => e.preventDefault()}>
          Help
        </StyledNavLink>
      </NavServices>
    </StyledNav>
  );
}
