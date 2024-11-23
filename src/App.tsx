import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Personal from "./pages/Personal";
import GlobalStyles from "./styles/GlobalStyles";
import ProtectedRoute from "./ui/ProtectedRoute";
import Banking from "./pages/Banking";
import { AuthProvider } from "./context/AuthContext.tsx";
import BankingHome from "./pages/BankingHome";
import Beneficiaries from "./pages/Beneficiaries";
import Transactions from "./pages/Transactions";
import Settings from "./pages/Settings";

import "./services/transactions.ts";
import TransferPage from "./pages/TransferPage.tsx";
import ViolationPage from "./pages/ViolationPage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";

const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Personal />,
      },
      {
        path: "/banking",
        element: (
          <ProtectedRoute>
            <Banking />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <BankingHome />,
          },
          {
            path: "beneficiaries",
            element: <Beneficiaries />,
          },
          {
            path: "transactions",
            element: <Transactions />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
          {
            path: "transfer",
            element: <TransferPage />,
          },
        ],
      },

      {
        path: "/international-transaction-violation",
        element: <ViolationPage />,
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <GlobalStyles />
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
