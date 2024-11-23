import { createContext, useContext, useState } from "react";
import { Transaction } from "../services/transactions";

interface TransferContextType {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  accountBalance: number;
  setAccountBalance: React.Dispatch<React.SetStateAction<number>>;
  showBank: boolean;
  setShowBank: React.Dispatch<React.SetStateAction<boolean>>;
  transactionMessages: Record<string, Transaction[]>;
  setTransactionMessages: React.Dispatch<
    React.SetStateAction<Record<string, Transaction[]>>
  >;
  reloadTransactionMsgFlag: boolean;
  setReloadTransactionMsgFlag: React.Dispatch<React.SetStateAction<boolean>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;

  // token: number;
  // setToken:
}

interface TransferProviderProps {
  children: React.ReactNode;
}

const TransferContext = createContext<TransferContextType | undefined>(
  undefined
);

function TransferProvider({ children }: TransferProviderProps) {
  const [loading, setLoading] = useState(false);
  const [accountBalance, setAccountBalance] = useState(0);
  const [showBank, setShowBank] = useState(true);
  const [transactionMessages, setTransactionMessages] = useState<
    Record<string, Transaction[]>
  >({});
  const [reloadTransactionMsgFlag, setReloadTransactionMsgFlag] =
    useState(false);
  const [email, setEmail] = useState("");

  // const [token, setToken] = useState(0);

  return (
    <TransferContext.Provider
      value={{
        loading,
        setLoading,
        accountBalance,
        setAccountBalance,
        showBank,
        setShowBank,
        transactionMessages,
        setTransactionMessages,
        reloadTransactionMsgFlag,
        setReloadTransactionMsgFlag,
        email,
        setEmail,
      }}
    >
      {children}
    </TransferContext.Provider>
  );
}

function useTransferContext() {
  const context = useContext(TransferContext);
  if (context === undefined)
    throw new Error("Context was used outside TransferContext Provider");
  return context;
}

export { TransferProvider, useTransferContext };
