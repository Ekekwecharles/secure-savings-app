import styled from "styled-components";
import Search from "../components/Search";

const StyledViolationPage = styled.div`
  h1 {
    color: #e31837;
    font-size: 2.5rem;
  }

  a {
    color: #007bff;
    text-decoration: none;
  }

  button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 1rem;
    width: 20rem;
  }
`;

const Container = styled.div`
  text-align: center;
  font-family: "DM Sans", sans-serif;
  padding: 1rem 6rem;
`;

const Message = styled.p`
  font-size: 1.6rem;
  margin-top: 1rem;
`;

const Email = styled.p`
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
  font-size: 1.5rem;
`;

export default function ViolationPage() {
  return (
    <StyledViolationPage>
      <Search />
      <Container>
        <h1>International Transaction Violation!!!</h1>
        <Message>
          Dear Valued Customer,
          <br />
          Your account has been temporarily suspended due to a violation of our
          international transaction policy. Please visit the nearest Secure
          Savings branch or contact our customer care team to resolve this
          issue.
        </Message>
        <Email>
          <strong>Email:</strong>
          <a href="mailto:securesavings.help@gmail.com">
            securesavings.help@gmail.com
          </a>
        </Email>
        <button
          onClick={() => {
            window.location.href = "mailto:securesavings.help@gmail.com";
          }}
        >
          Email Us
        </button>
      </Container>
    </StyledViolationPage>
  );
}
