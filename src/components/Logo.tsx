import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledLogo = styled.div`
  font-size: 3rem;
  font-weight: bolder;
  color: #030368;
  /* font-family: "Roboto", sans-serif; */
  font-family: "DM Sans", sans-serif;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  @media (max-width: 37.5em) {
    font-size: 2rem;
  }

  img {
    height: 4rem;
  }
`;

export default function Logo() {
  const navigate = useNavigate();

  return (
    <StyledLogo onClick={() => navigate("/")}>
      SECURE SAVINGS
      <img src="icon.png" alt="" />
    </StyledLogo>
  );
}
