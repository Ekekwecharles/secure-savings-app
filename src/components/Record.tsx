import { TbFileInvoice } from "react-icons/tb";
import styled from "styled-components";
import { formatUSD } from "../utils/helper";

const StyledRecord = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  font-weight: bolder;
  font-size: 1.4rem;
`;

const CreditAmount = styled.div`
  color: #00804f;
  font-size: 1.5rem;
  font-weight: bolder;
`;

const DebitAmount = styled.div`
  color: #d30b29;
  font-size: 1.5rem;
  font-weight: bolder;
`;

const SvgContainer = styled.div`
  background-color: #eec8cd;
  height: 4rem;
  width: 4rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  flex-shrink: 0;

  svg {
    color: #d30b29;
    font-size: 1.8rem;
  }
`;

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

// {
//   id: "TRANS-32",
//   date: "2024-10-15 00:00:00",
//   transactionType: "Bank Withdrawal",
//   status: "Debit",
//   amount: "297051.00",
//   sender: null,
//   receiver: "Casper and Sons",
//   referenceCode: "9u5gIsHZ3dgmLvWa",
//   accountNumber: "19400216",
//   location: "Sudan",
//   balanceAfterTransaction: "12341555.00",
// }

type RecordProps = {
  value: Transaction;
};

export default function Record({ value }: RecordProps) {
  return (
    <StyledRecord>
      <Flex>
        <SvgContainer>
          <TbFileInvoice />
        </SvgContainer>
        <div>
          <div>
            {value.status === "Credit"
              ? `Transfer from ${value.sender}`
              : `TRF FRM SERGEY KOSENKO TO ${value.receiver} `}
          </div>
          <div>{value.referenceCode}</div>
        </div>
      </Flex>
      <div>
        {value.status === "Credit" ? (
          <CreditAmount>{formatUSD(+value.amount)}</CreditAmount>
        ) : (
          <DebitAmount>{formatUSD(+value.amount)}</DebitAmount>
        )}{" "}
      </div>
    </StyledRecord>
  );
}
