import styled from "styled-components";
import Record from "./Record";

const TransactionDate = styled.div`
  font-weight: bolder;
  font-size: 1.5rem;
  padding-bottom: 5px;
  color: gray;
  border-bottom: 1px solid gray;
`;

const RecordContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 1.5rem;
`;

const StyledTransaction = styled.div``;

interface Transaction {
  id: string;
  date: string;
  transactionType: string;
  status: string;
  amount: string;
  sender: string | null;
  receiver: string | null;
  referenceCode: string;
  accountNumber: string;
  location: string;
  balanceAfterTransaction: string;
}

type TransactionProps = {
  date: string;
  value: Transaction[];
};
export default function Transaction({ date, value }: TransactionProps) {
  function format(date: string) {
    const _date = new Date(date);
    if (String(_date) === "Invalid Date") return;

    const newDate = new Intl.DateTimeFormat("en", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      weekday: "long",
    })
      .format(_date)
      .toUpperCase();

    return newDate;
  }

  return (
    <StyledTransaction>
      <TransactionDate>{format(date)}</TransactionDate>
      <RecordContainer>
        {value.map((value, i) => (
          <Record value={value} key={i} />
        ))}
      </RecordContainer>
    </StyledTransaction>
  );
}
