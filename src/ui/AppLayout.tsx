import { Outlet } from "react-router-dom";
import { TransferProvider } from "../context/TransferContext";

export default function AppLayout() {
  return (
    <div>
      <main>
        <TransferProvider>
          <Outlet />
        </TransferProvider>
      </main>
    </div>
  );
}
