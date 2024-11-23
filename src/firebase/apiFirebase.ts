import app from "../firebaseConfig";
import { getDatabase, ref, set, get, push } from "firebase/database";
import { Transaction } from "../services/transactions";

// FOR ACCOUNT BALANCE AND UPDATE
export async function setAccountBalance(accountBalance: number) {
  console.log("Button Clicked");

  const db = getDatabase(app);
  const newDocRef = push(ref(db, "secure_savings/account"));

  try {
    await set(newDocRef, { accountBalance: accountBalance });
    console.log("Well done");
    alert("Data saved successfully");
  } catch (e) {
    // alert(err.message);
    console.log(e);
  }
}

interface AccountBalance {
  accountBalance: number;
}

export async function getAccountBalance() {
  const db = getDatabase();
  const dbRef = ref(db, "secure_savings/account");
  const snapshot = await get(dbRef);
  if (snapshot.exists()) {
    const accountBalanceArray = Object.values(
      snapshot.val()
    ) as AccountBalance[];
    const accountBalance = accountBalanceArray[0].accountBalance;
    return accountBalance;
  } else {
    // alert("error");
    console.log("error");
  }
}

export async function updateAccountBalance(newAccountBalance: number) {
  try {
    const db = getDatabase(app);
    const dbRef = ref(db, "secure_savings/account");

    // Retrieve the current account data to get the ID
    const snapshot = await get(dbRef);

    // Check if there is existing account data
    if (snapshot.exists()) {
      const id = Object.keys(snapshot.val())[0];
      const accountRef = ref(db, `secure_savings/account/${id}`);

      // Update the account balance
      await set(accountRef, { accountBalance: newAccountBalance });
    } else {
      // alert("No account data available to update.");
    }
  } catch (e) {
    console.error("Error updating account balance:", e);
    // alert("An error occurred while updating the account balance.");
  }
}

//SHOW BANK OR HIDE BANK
export async function setShowBank() {
  console.log("Button Clicked");

  const db = getDatabase(app);
  const newDocRef = push(ref(db, "secure_savings/showBank"));

  try {
    await set(newDocRef, { showBank: true });
    console.log("Well done");
    // alert("ShowBank Has been successfully added to the database");
  } catch (e) {
    // alert((e as Error).message);
    console.log(e);
  }
}

interface showBank {
  showBank: boolean;
}

export async function getShowBank() {
  const db = getDatabase();
  const dbRef = ref(db, "secure_savings/showBank");
  const snapshot = await get(dbRef);
  if (snapshot.exists()) {
    const showBankArray = Object.values(snapshot.val()) as showBank[];
    const showBank = showBankArray[0].showBank;
    return showBank;
  } else {
    alert("error");
  }
}

export async function updateShowBank(value: boolean) {
  try {
    const db = getDatabase(app);
    const dbRef = ref(db, "secure_savings/showBank");

    // Retrieve the current showBank data to get the ID
    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
      const id = Object.keys(snapshot.val())[0];
      const showBankRef = ref(db, `secure_savings/showBank/${id}`);

      await set(showBankRef, { showBank: value });
      // alert("showBank updated successfully");
    } else {
      console.log("No showBank data available to update.");
      // alert("No showBank data available to update.");
    }
  } catch (e) {
    console.error("Error updating showBank:", e);
    // alert("An error occurred while updating the showBank.");
  }
}

// Generate and Format Transaction message
export async function setTransactionsMessage(TransactionMsgObj: Transaction) {
  console.log("Button Clicked");

  const db = getDatabase(app);
  const newDocRef = push(ref(db, "secure_savings/transactions"));

  try {
    await set(newDocRef, TransactionMsgObj);
    console.log("Well done");
    // alert("Transaction Has been successfully added to the database");
  } catch (e) {
    // alert((e as Error).message);
    console.log(e);
  }
}

interface showBank {
  showBank: boolean;
}

export async function getTransactionsMessages() {
  try {
    const db = getDatabase();
    const dbRef = ref(db, "secure_savings/transactions");
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const TransactionMessagesArray = Object.values(
        snapshot.val()
      ) as Transaction[];

      return TransactionMessagesArray;
    } else {
      // alert("error");
      return [];
    }
  } catch (error) {
    // alert((error as Error).message);
    console.error("Error fetching transactions:", error);
  }
}

// export async function updateTransactionsMessage(value: boolean) {
//   try {
//     const db = getDatabase(app);
//     const dbRef = ref(db, "secure_savings/showBank");

//     // Retrieve the current showBank data to get the ID
//     const snapshot = await get(dbRef);

//     // Check if there is existing account data
//     if (snapshot.exists()) {
//       const id = Object.keys(snapshot.val())[0];
//       const showBankRef = ref(db, `secure_savings/showBank/${id}`);

//       // Update the account balance
//       await set(showBankRef, { showBank: value });
//       alert("showBank updated successfully");
//     } else {
//       alert("No showBank data available to update.");
//     }
//   } catch (e) {
//     console.error("Error updating showBank:", e);
//     alert("An error occurred while updating the showBank.");
//   }
// }

// PASSWORD
export async function setPassword() {
  console.log("Button Clicked");

  const db = getDatabase(app);
  const newDocRef = push(ref(db, "secure_savings/password"));

  try {
    await set(newDocRef, { password: "wizkhalifa" });
    console.log("Well done");
    alert("Password data added to database successfully");
  } catch (e) {
    // alert(err.message);
    console.log(e);
  }
}

interface Password {
  password: string;
}

export async function getPassword() {
  const db = getDatabase();
  const dbRef = ref(db, "secure_savings/password");
  const snapshot = await get(dbRef);
  if (snapshot.exists()) {
    const passwordArray = Object.values(snapshot.val()) as Password[];
    const password = passwordArray[0].password;
    return password;
  } else {
    // alert("error");
    console.log("error");
  }
}

export async function updatePassword(newPassword: string) {
  try {
    const db = getDatabase(app);
    const dbRef = ref(db, "secure_savings/password");

    // Retrieve the current account data to get the ID
    const snapshot = await get(dbRef);

    // Check if there is existing account data
    if (snapshot.exists()) {
      const id = Object.keys(snapshot.val())[0];
      const passwordRef = ref(db, `secure_savings/password/${id}`);

      // Update the account balance
      await set(passwordRef, { password: newPassword });
      alert("Password updated successfully");
    } else {
      // alert("No password data available to update.");
    }
  } catch (e) {
    console.error("Error updating Password:", e);
    // alert("An error occurred while updating the password.");
  }
}
