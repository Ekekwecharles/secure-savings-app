import emailjs from "@emailjs/browser";

export function formatUSD(value: number) {
  const formattedValue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    // minimumFractionDigits: 0,
  }).format(value);

  return formattedValue;
}

export function sendTokenByEmail(
  token: number,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setStep: React.Dispatch<React.SetStateAction<number>>,
  bank: string,
  accountNum: number,
  accountName: string,
  amount: number,
  email: string
) {
  console.log("Bank", bank);
  console.log("accountNUm", accountNum);
  console.log("accountName", accountName);
  console.log("amount", amount);
  setLoading(true);
  const formattedAmount = amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  const templateParams = {
    to_email: `${email}`,
    message: `
    Dear Customer,

You are about to initiate a transaction with the following details:

- **Bank Name**: ${bank}
- **Account Number**: ${accountNum}
- **Account Name**: ${accountName}
- **Amount**: ${formattedAmount}

To proceed, please use the verification token below:

**Verification Token**: ${token}
**Pin**: 7298

If you did not request this transaction, please disregard this email. For any assistance, contact our support team.

Thank you for banking with us.

Best regards,  
Your Banking Team
    `,
  };

  emailjs
    .send(
      "service_af66t5l",
      "template_bn7c19d",
      templateParams,
      "QlFwB8q3Jojd5ujop"
    )
    .then(
      () => {
        alert(
          "The verification token and Pin has been sent to the email you used to login. Please use this token to complete your transaction."
        );
        setLoading(false);
        setStep(2);
      },
      (error) => {
        alert("An error occurred while sending the token.");
        console.error("Error sending token:", error);
      }
    );

  setLoading(false);
  setStep(2);
}
