import styled from "styled-components";
import BackBtn from "../components/BackBtn";
import { useEffect, useState } from "react";
import { sendTokenByEmail } from "../utils/helper";
import { useNavigate } from "react-router-dom";
import { useTransferContext } from "../context/TransferContext";
import TokenInput from "../components/TokenInput";
import PinInput from "../components/PinInput";
import { GiCheckMark } from "react-icons/gi";
import { useAuth } from "../context/AuthContext";

const StyledTransferPage = styled.div`
  padding: 0 6rem;
  width: 70rem;

  @media (max-width: 37.5em) {
    padding: 0 2rem;
    width: 100%;
  }

  h3 {
    font-size: 1.8rem;
    margin-top: 2rem;
  }
`;

const DropdownContent = styled.div<{ show: boolean }>`
  width: 60rem;
  max-height: 25rem;
  overflow-y: auto;
  background-color: white;
  border: 1px solid #ccc;
  display: ${({ show }) => (show ? "block" : "none")};
  margin-top: 0.7rem;
  border-radius: 10px;

  @media (max-width: 37.5em) {
    width: 100%;
  }
`;

const DropdownItem = styled.div`
  padding: 1rem;
  font-size: 1.3rem;
  cursor: pointer;
  font-weight: bold;
  color: #4d4d4d;

  &:hover {
    background-color: #dbdbdb;
  }
`;

const ErrorMessage = styled.div`
  font-size: 1.3rem;
  color: #d30b29;
  margin-top: 1rem;
  margin-left: 1rem;
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid #ccc;
  padding: 2rem;
  border-radius: 10px;
  margin-top: 1rem;
  font-family: inherit;
  font-weight: bold;
  color: #4d4d4d;

  &:focus {
    outline: none;
  }
`;

// const AccountHolder = styled.p`
//   text-transform: uppercase;
//   font-size: 1.1rem;
//   font-weight: bolder;
//   text-align: right;
//   padding: 3px;
// `;

const ProceedBtn = styled.button`
  width: 100%;
  color: white;
  background-color: #d30b29;
  border: 1px solid #ccc;
  padding: 2rem;
  border-radius: 10px;
  font-size: 1.5rem;
  font-weight: bolder;
  margin-top: 1rem;
  cursor: pointer;
`;

const InputErrors = styled.p`
  font-size: 1.1rem;
  color: red;
  font-weight: bold;
  margin-left: 1rem;
`;

const ModalBG = styled.div`
  width: 100%;
  height: 100vh;
  /* z-index: 100; */
  background-color: #aaaaaa9d;
  backdrop-filter: blur(2px);
  position: absolute;
  inset: 0 0 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  height: 20rem;
  width: 30rem;
  background-color: white;
  padding: 2.5rem;
  font-size: 1.8rem;
  text-align: center;
  border-radius: 5px;
  font-weight: bolder;

  button {
    font-family: inherit;
    border: none;
    width: 8rem;
    padding: 0.5rem 1rem;
    font-size: 1.5rem;
    margin-top: 2rem;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button:first-child {
    color: white;
    background-color: #d30b29;
    margin-right: 2rem;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const SuccessfulTransaction = styled.div`
  background-color: white;
  text-align: center;
  font-size: 2rem;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  svg {
    font-size: 8rem;
    color: green;
  }

  button {
    display: block;
    margin-top: 1rem;
    padding: 1.5rem 0;
    background-color: green;
    color: white;
    border: none;
    font-size: 1.8rem;
    border-radius: 15px;
    cursor: pointer;
  }
`;

const data = [
  "ANZ New Zealand",
  "Alpha Bank",
  "Al Rajhi Bank",
  "ASB Bank",
  "Banco de Chile",
  "Banco Galicia",
  "Banco Santander Chile",
  "Banco de la Nación Argentina",
  "Banque Misr",
  "Banorte",
  "Barclays",
  "BDO Unibank",
  "BBVA Bancomer",
  "CIMB Bank",
  "Citibank",
  "Commonwealth Bank of Australia",
  "Commerzbank",
  "Credit Suisse",
  "DBS Bank",
  "Danske Bank",
  "Deutsche Bank",
  "Dutch-Bangla Bank",
  "Emirates NBD",
  "Erste Group Bank",
  "First Abu Dhabi Bank",
  "First Bank of Nigeria",
  "FirstRand Bank",
  "Goldman Sachs",
  "Guaranty Trust Bank",
  "Habib Bank Limited",
  "HSBC",
  "HDFC Bank",
  "Industrial and Commercial Bank of China",
  "ING Group",
  "Isbank",
  "JPMorgan Chase",
  "Jyske Bank",
  "Kuwait Finance House",
  "KB Kookmin Bank",
  "Mitsubishi UFJ Financial Group",
  "Metropolitan Bank and Trust Company",
  "Maybank",
  "National Bank of Egypt",
  "National Bank of Greece",
  "National Bank of Kuwait",
  "Nordea Bank Finland",
  "OP Financial Group",
  "PNC Bank",
  "Qatar National Bank",
  "Raiffeisen Bank International",
  "Rafidain Bank",
  "Royal Bank of Canada",
  "Sberbank",
  "SEB (Skandinaviska Enskilda Banken)",
  "Shinhan Bank",
  "Sonali Bank",
  "State Bank of India",
  "Standard Bank",
  "Société Générale",
  "SpareBank 1",
  "Sumitomo Mitsui Financial Group",
  "TD Bank",
  "Truist Bank",
  "Trade Bank of Iraq",
  "UBS",
  "United Bank Limited",
  "United Overseas Bank (UOB)",
  "VTB Bank",
  "Vietcombank",
  "Wells Fargo",
  "Ziraat Bank",
];

function formatUSD(value: number) {
  const formattedValue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(value);

  return formattedValue;
}

export default function TransferPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(false);
  const [filteredBanks, setFilteredBanks] = useState(data);
  const [showDropdown, setShowDropdown] = useState(false);
  const [accountNum, setAccountNum] = useState<number | undefined>(undefined);
  const [saveAccountNum, setSaveAccountNum] = useState(0);
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [displayValue, setDisplayValue] = useState<string>("");
  const [inputErrors, setInputErrors] = useState(false);
  const [showGetToken, setShowGetToken] = useState(false);
  const [token, setToken] = useState(0);
  const [step, setStep] = useState(1);
  const [accountName, setAccountName] = useState("");

  const [savedTransaction, setSavedTransaction] = useState({
    bank: "",
    accountNum: 0,
    accountName: "",
    amount: 0,
  });

  const { email } = useTransferContext();

  const accountMap: { [key: number]: string } = {
    138567491234: "Kuwait Petroleum Corporation (KPC)",
    459230817652: "Zain Group",
    284673291057: "Agility Public Warehousing Company",
    191034578901: "Ahmad Al-Sabah",
    284765193472: "Fatima Al-Mutairi",
    356908213457: "Yusuf Al-Kandari",
  };

  useEffect(() => {
    if (accountNum && accountMap[accountNum]) {
      setAccountName(accountMap[accountNum]);
    }
  }, [accountNum]);

  const navigate = useNavigate();
  const { loading, setLoading } = useTransferContext();
  const { resetTimer } = useAuth();

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.replace(/[^0-9]/g, "");
    const numericValue = value ? parseInt(value, 10) : undefined;

    setAmount(numericValue);
    setDisplayValue(numericValue !== undefined ? formatUSD(numericValue) : "");
  }

  function searchBank(event: React.ChangeEvent<HTMLInputElement>) {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    if (term === "") {
      setFilteredBanks(data);
      setError(false);
    } else {
      const filtered = data.filter((bank) => bank.toLowerCase().includes(term));
      setFilteredBanks(filtered);
      setError(filtered.length === 0);
    }
  }

  function selectBank(bankName: string) {
    setSearchTerm(bankName);
    setShowDropdown(false);
  }

  function handleSubmit() {
    if (
      !searchTerm ||
      !accountNum ||
      !displayValue ||
      !amount ||
      !accountName
    ) {
      setInputErrors(true);
      return;
    }

    setSavedTransaction({
      bank: searchTerm,
      accountNum: accountNum!,
      accountName,
      amount: amount!,
    });

    setSaveAccountNum(accountNum!);
    setShowGetToken(true);
    setInputErrors(false);
    setSearchTerm("");
    setAccountNum(undefined);
    setDisplayValue("");
    setAccountName("");
    setLoading(false);
    resetTimer();
  }

  function generateToken() {
    const _token = Math.floor(100000 + Math.random() * 900000);
    setToken(_token);
    const { bank, accountNum, accountName, amount } = savedTransaction;
    sendTokenByEmail(
      _token,
      setLoading,
      setStep,
      bank,
      accountNum,
      accountName,
      amount,
      email
    );
  }

  return (
    <StyledTransferPage>
      <BackBtn />
      <h3>Bank Transfers</h3>
      <div>
        <div>
          <Input
            type="text"
            id="bankSearch"
            placeholder="Bank"
            value={searchTerm}
            onChange={searchBank}
            onFocus={() => setShowDropdown(true)}
          />

          {!error && (
            <DropdownContent show={showDropdown}>
              {filteredBanks.map((bank, index) => (
                <DropdownItem key={index} onClick={() => selectBank(bank)}>
                  {bank}
                </DropdownItem>
              ))}
            </DropdownContent>
          )}
          {error && (
            <ErrorMessage>
              Bank not recognized. Please enter a valid bank name.
            </ErrorMessage>
          )}
        </div>

        <div>
          <Input
            type="number"
            placeholder="Beneficiary account number"
            value={accountNum ?? ""}
            onChange={(e) =>
              setAccountNum(
                e.target.value ? parseInt(e.target.value) : undefined
              )
            }
          />

          <Input
            type="text"
            placeholder="Beneficiary account name"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
          />

          <Input
            placeholder="Amount"
            type="text"
            value={displayValue}
            onChange={handleInputChange}
          />
          {inputErrors && (
            <InputErrors>All the Input fields are required</InputErrors>
          )}
          <ProceedBtn onClick={handleSubmit}>Proceed</ProceedBtn>
        </div>
      </div>

      {step === 1 && showGetToken && (
        <ModalBG>
          <Modal>
            A Token will be sent to the email you used in logging in.
            <BtnContainer>
              <button onClick={generateToken}>
                {loading ? <div className="loader"></div> : "Continue"}
              </button>
              <button onClick={() => setShowGetToken(false)}>Cancel</button>
            </BtnContainer>
          </Modal>
        </ModalBG>
      )}

      {step === 2 && (
        <ModalBG>
          <TokenInput generatedToken={token} setStep={setStep} />
        </ModalBG>
      )}

      {step === 3 && (
        <ModalBG>
          <PinInput
            setStep={setStep}
            amount={amount!}
            accountNum={saveAccountNum}
          />
        </ModalBG>
      )}

      {step === 4 && (
        <ModalBG>
          <SuccessfulTransaction>
            <div>
              <GiCheckMark />
            </div>
            <p>Your transaction was successful.</p>

            <button onClick={() => navigate("/banking")}>OK</button>
          </SuccessfulTransaction>{" "}
        </ModalBG>
      )}
    </StyledTransferPage>
  );
}

// {searchTerm && accountNum && (
//   <AccountHolder>
//     {accountNum === 138567491234 && (
//       <AccountHolder>
//         Kuwait Petroleum Corporation (KPC)
//       </AccountHolder>
//     )}
//     {accountNum === 459230817652 && (
//       <AccountHolder>Zain Group</AccountHolder>
//     )}
//     {accountNum === 284673291057 && (
//       <AccountHolder>
//         Agility Public Warehousing Company
//       </AccountHolder>
//     )}
//     {accountNum === 191034578901 && (
//       <AccountHolder>Ahmad Al-Sabah</AccountHolder>
//     )}
//     {accountNum === 284765193472 && (
//       <AccountHolder>Fatima Al-Mutairi</AccountHolder>
//     )}
//     {accountNum === 356908213457 && (
//       <AccountHolder>Yusuf Al-Kandari</AccountHolder>
//     )}
//   </AccountHolder>
// )}

// "Kuwait": [
//   "National Bank of Kuwait",
//   "Kuwait Finance House"
// ]

// //////// National Bank of Kuwait (NBK)
// Account Number: 191034578901
// Owner: Ahmad Al-Sabah

// Account Number: 284765193472
// Owner: Fatima Al-Mutairi

// /////// Kuwait Finance House (KFH)
// Account Number: 356908213457
// Owner: Yusuf Al-Kandari

// Account Number: 409871265839
// Owner: Salwa Al-Fahad

// --------------------------------------------------

// National Bank of Kuwait (NBK)

// Account Number: 138567491234
// Owner: Kuwait Petroleum Corporation (KPC)

// Account Number: 284673291057
// Owner: Agility Public Warehousing Company

// Kuwait Finance House (KFH)

// Account Number: 459230817652
// Owner: Zain Group

// Account Number: 517894306128
// Owner: Layla Al-Rashid

// --------------TEST
// National Bank of Kuwait (NBK)
// Account Number: 138567491234
// Owner: Kuwait Petroleum Corporation (KPC)
