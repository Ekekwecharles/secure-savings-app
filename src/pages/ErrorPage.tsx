import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaExclamationTriangle } from "react-icons/fa";

const StyledErrorPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-color: #f8f9fa;
  color: #343a40;
`;

const Icon = styled.div`
  font-size: 5rem;
  color: #e63946;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #6c757d;
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 0.3rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

export default function ErrorPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <StyledErrorPage>
      <Icon>
        <FaExclamationTriangle />
      </Icon>
      <Title>Oops! Something went wrong.</Title>
      <Message>
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </Message>
      <Button onClick={handleGoHome}>Go Back to Home</Button>
    </StyledErrorPage>
  );
}
