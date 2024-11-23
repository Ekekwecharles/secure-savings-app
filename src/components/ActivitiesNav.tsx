import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavPages = styled.div`
  display: flex;
  align-items: center;
  /* gap: 2rem; */
  justify-content: space-between;
  font-size: 2rem;
  padding: 0 4.5rem;
  font-family: "DM Sans", sans-serif;

  @media (max-width: 61em) {
    padding: 0 1rem;
  }

  @media (max-width: 56.25em) {
    font-size: 1rem;
  }

  @media (max-width: 37.5em) {
    gap: 1rem;
  }

  span {
    font-size: 2rem;
    display: inline-block;
    margin-top: 0.1rem;

    @media (max-width: 56.25em) {
      font-size: 1rem;
    }
  }
`;

const StyledNavLink = styled(NavLink)`
  border-bottom: 2px solid transparent;
  padding: 0 0 1rem;
  color: inherit;
  text-decoration: none;

  @media (max-width: 56.25em) {
    padding: 0 0 0.5rem;
  }

  &:hover,
  &.active {
    border-bottom: 2px solid black;
  }
`;

const StyledNavLinkFlex = styled(StyledNavLink)`
  display: flex;
  align-items: start;
`;

export default function ActivitiesNav() {
  return (
    <NavPages>
      <StyledNavLink to="checking" onClick={(e) => e.preventDefault()}>
        Checking
      </StyledNavLink>
      <StyledNavLink to="savings" onClick={(e) => e.preventDefault()}>
        Savings & CDs
      </StyledNavLink>
      <StyledNavLink to="credit-cards" onClick={(e) => e.preventDefault()}>
        Credit Cards
      </StyledNavLink>
      <StyledNavLink to="home-loans" onClick={(e) => e.preventDefault()}>
        Home Loans
      </StyledNavLink>
      <StyledNavLink to="auto-loans" onClick={(e) => e.preventDefault()}>
        Auto Loans
      </StyledNavLink>
      <StyledNavLink to="investing" onClick={(e) => e.preventDefault()}>
        Investing
      </StyledNavLink>
      <StyledNavLinkFlex
        to="better-money-habits"
        onClick={(e) => e.preventDefault()}
      >
        Better Money Habits<span>&reg;</span>
      </StyledNavLinkFlex>
    </NavPages>
  );
}
