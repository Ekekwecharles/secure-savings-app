import { useState } from "react";
import { login } from "./Login";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  setTransactionsMessage,
  updateAccountBalance,
  updateShowBank,
} from "../firebase/apiFirebase";
import { useTransferContext } from "../context/TransferContext";
import { faker } from "@faker-js/faker";
import { useAuth } from "../context/AuthContext";

const StyledPinInput = styled.div`
  width: 250px;
  h3 {
    font-size: 2.5rem;
    margin-bottom: 0.6rem;
  }
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;

  input {
    text-align: center;
    font-size: 20px;
    width: 40px;
    height: 50px;
    /* border: 1px solid gray; */
    border: none;

    &:focus {
      outline: 3px solid #d30b29;
      border: none;
    }
  }
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1rem;

  button {
    font-family: inherit;
    border: none;
    /* width: 8rem; */
    width: 12rem;
    padding: 1rem;
    font-size: 1.5rem;
    margin-top: 2rem;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    &:disabled {
      opacity: 0.4;
      cursor: default;
    }
  }

  button:first-child {
    color: white;
    background-color: #d30b29;
    width: 12rem;
  }
`;

interface PinInputProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  amount: number;
  accountNum: number;
}

export default function PinInput({
  setStep,
  amount,
  accountNum,
}: PinInputProps) {
  const [pin, setPin] = useState<string[]>(["", "", "", ""]); // Holds values for each of the 6 boxes
  const navigate = useNavigate();
  const { resetTimer } = useAuth();

  const {
    accountBalance,
    setAccountBalance,
    setShowBank,
    setReloadTransactionMsgFlag,
  } = useTransferContext();

  // Function to handle the change in each input box
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;

    // Allow only numbers and update the respective box
    if (/^[0-9]$/.test(value)) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);

      // Focus on the next input box if current box is filled
      if (index < 3 && value !== "") {
        const nextInput = document.getElementById(`pin-input-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  // Function to handle form submission
  const handleSubmit = () => {
    const pinValue = pin.join("");

    if (pinValue === login.pin && amount > 20000000) {
      setShowBank(false);
      updateShowBank(false);
      return;
    }

    if (pinValue === login.pin) {
      const newBalance = accountBalance - amount;
      setAccountBalance(newBalance);
      updateAccountBalance(newBalance);
      generateTransactionMessage();
      setReloadTransactionMsgFlag((value) => !value);
      resetTimer();
      setStep(4);
    } else {
      alert("Invalid Pin");
    }
  };

  function getDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day} 00:00:00`;
    return formattedDate;
  }

  function getReceiver() {
    if (accountNum === 138567491234)
      return "Kuwait Petroleum Corporation (KPC)";
    if (accountNum === 459230817652) return "Zain Group";
    if (accountNum === 284673291057)
      return "Agility Public Warehousing Company";
    if (accountNum === 191034578901) return "Ahmad Al-Sabah";
    if (accountNum === 284765193472) return "Fatima Al-Mutairi";
    if (accountNum === 356908213457) return "Yusuf Al-Kandari";

    return "";
  }

  function generateTransactionMessage() {
    const TransactionMsgObj = {
      id: `TRANS-${Math.floor(Math.random() * 100) + 1}`,
      date: getDate(),
      transactionType: "Bank Withdrawal",
      status: "Debit",
      amount: amount.toFixed(2),
      sender: "null",
      receiver: getReceiver(),
      referenceCode: faker.string.alphanumeric(16),
      accountNumber: "19400216",
      location: "null",
      balanceAfterTransaction: String(accountBalance),
    };

    setTransactionsMessage(TransactionMsgObj);
  }

  return (
    <StyledPinInput>
      <h3>Enter pin</h3>

      <InputContainer>
        {pin.map((value, index) => (
          <input
            key={index}
            id={`pin-input-${index}`}
            type="text"
            maxLength={1}
            value={value}
            onChange={(e) => handleChange(e, index)}
          />
        ))}
      </InputContainer>

      <BtnContainer>
        <button
          onClick={handleSubmit}
          disabled={pin.includes("")} // Disable button if any of the boxes is empty
        >
          Submit Pin
        </button>
        {/* <button onClick={() => setStep(1)}>Cancel</button> */}
        <button onClick={() => navigate("/banking")}>Cancel</button>
      </BtnContainer>
    </StyledPinInput>
  );
}
