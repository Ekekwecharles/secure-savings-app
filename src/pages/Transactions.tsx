import styled from "styled-components";
import BackBtn from "../components/BackBtn";
import Transaction from "../components/Transaction";
import { useTransferContext } from "../context/TransferContext";

const TransactionsContainer = styled.div`
  padding: 0 6rem;

  @media (max-width: 37.5em) {
    padding: 0 2rem;
  }

  h3 {
    font-size: 1.8rem;
  }

  p {
    font-size: 1.1rem;
    background-color: #e31837;
    color: white;
    padding: 2px 5px;
    border-radius: 10px;
  }
`;

const TransactionContainer = styled.div`
  background-color: white;
  padding: 2.5rem;
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
`;

export default function Transactions() {
  const { transactionMessages } = useTransferContext();

  return (
    <TransactionsContainer>
      <BackBtn />
      <div>
        <Flex>
          <h3>Transaction History</h3>
          <p>Only a month transaction history is shown</p>
        </Flex>

        <TransactionContainer>
          {Object.entries(transactionMessages).map(([date, value]) => (
            <Transaction date={date} value={value} key={date} />
          ))}
        </TransactionContainer>
      </div>
    </TransactionsContainer>
  );
}
