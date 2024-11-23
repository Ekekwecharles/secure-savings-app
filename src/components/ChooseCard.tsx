import styled from "styled-components";
import Login from "./Login";
import Card from "./Card";

const ChooseCardGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(10rem, 32rem) 1fr;
  padding: 2rem;
  gap: 7rem;
  align-items: start;
  font-family: "DM Sans", sans-serif;

  //1150px
  @media (max-width: 71.8em) {
    gap: 3rem;
  }

  @media (max-width: 37.5em) {
    grid-template-columns: 1fr;
  }

  h1 {
    grid-column: 1/-1;
    font-size: 4rem;
    font-weight: 400;

    @media (max-width: 37.5em) {
      font-size: 3rem;
    }
  }
`;

const ChooseCardContainer = styled.div`
  display: grid;
  gap: 2.4rem;
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 37.5em) {
    grid-template-columns: 1fr;
  }
`;

export default function ChooseCard() {
  return (
    <ChooseCardGrid>
      <Login />
      <ChooseCardContainer>
        <h1>Choose the card that works for you</h1>
        <Card
          price="$200"
          bonus="online bonus offer"
          annual="No annual fee"
          image="mixedcolorcard.jpg"
          cashRewards="Customized Cash Rewards"
          cashBack="3% cash back in the category of your choice >"
        />
        <Card
          price="$200"
          bonus="online bonus offer"
          annual="No annual fee"
          image="graycard.jpg"
          cashRewards="Unlimited Cash Rewards"
          cashBack="Unlimited 1.5% cash back on all purchases >"
        />

        <Card
          price="25,000"
          bonus="online bonus points offer"
          annual="No annual fee"
          image="blackcard.jpg"
          cashRewards="Travel Rewards"
          cashBack="Unlimited 1.5 points for every $1 spent on all purchases >"
        />

        <Card
          price="0%"
          bonus="into APR offer"
          annual="No annual fee"
          image="greencard.jpg"
          cashRewards="SecureSavingsCard®"
          cashBack="Into APR offer for 18 billing cycles >"
        />
      </ChooseCardContainer>
    </ChooseCardGrid>
  );
}
