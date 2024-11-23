import { FaMagnifyingGlass } from "react-icons/fa6";
import styled from "styled-components";
import Logo from "./Logo";

const BoaLogoContainer = styled.div`
  width: 35rem;

  @media (max-width: 37.5em) {
    width: 22rem;
  }
`;

const SearchContainer = styled.div`
  font-size: 1.8rem;
  font-family: "Roboto", sans-serif;
`;

const LogoSearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3rem 4.5rem;

  @media (max-width: 61em) {
    padding: 2rem 1rem;
  }
`;

export default function Search() {
  return (
    <LogoSearchContainer>
      <BoaLogoContainer>
        {/* <BoaLogo src="boalogo.svg" alt="boa logo" /> */}
        <Logo />
      </BoaLogoContainer>
      <SearchContainer>
        Search <FaMagnifyingGlass />
      </SearchContainer>
    </LogoSearchContainer>
  );
}
