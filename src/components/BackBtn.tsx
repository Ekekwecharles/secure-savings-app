import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledBackBtn = styled.button`
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  font-weight: bold;
  color: #e31837;
  border: none;
  background: none;
  cursor: pointer;

  svg {
    font-size: 1.6rem;
    color: black;
  }
`;

export default function BackBtn() {
  const navigate = useNavigate();

  return (
    <StyledBackBtn onClick={() => navigate("/banking")}>
      <IoIosArrowBack /> Back
    </StyledBackBtn>
  );
}
