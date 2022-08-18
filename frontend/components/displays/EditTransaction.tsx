import Portal from "components/base/Portal";
import React from "react";
import styles from "styles/Transactions.module.scss";
import pageStyles from "styles/Page.module.scss";
import componentStyles from "styles/Components.module.scss";
import { Transaction } from "pages/dashboard";
import Button from "components/base/Button";

type Props = {
  currentTransaction: Transaction;
  onClose: () => void;
  onSubmit: (amount: number, merchant: string, date: Date) => void;
};

const EditTransaction = (props: Props) => {
  const { currentTransaction, onClose, onSubmit } = props;
  const [amount, setAmount] = React.useState(currentTransaction.amount);
  const [merchant, setMerchant] = React.useState(currentTransaction.merchant);
  const [date, setDate] = React.useState(currentTransaction.date);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseFloat(e.target.value));
  };
  const handleMerchantChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMerchant(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(new Date(e.target.value));
  };

  return (
    <Portal onClose={onClose}>
      <div className={styles.editTransaction}>
        <div className={pageStyles.displayContainer}>
          <h1 className={pageStyles.displayHeader}>Edit Transaction</h1>
          <div className={pageStyles.displayContent}></div>
          <div className={componentStyles.inputField}>
            <label className="mx-2">Amount</label>
            <input
              className={componentStyles.input}
              type="number"
              placeholder={currentTransaction.amount as unknown as string}
              value={amount}
              onChange={handleAmountChange}
            />
          </div>
          <div className={componentStyles.inputField}>
            <label className="mx-2 ">Merchant</label>
            <input
              className={componentStyles.input}
              type="text"
              placeholder={currentTransaction.merchant as unknown as string}
              value={merchant}
              onChange={handleMerchantChange}
            />
          </div>
          <div className={componentStyles.inputField}>
            <label className="mx-2">Date</label>
            <input
              className={componentStyles.input}
              type="date"
              placeholder={currentTransaction.date as unknown as string}
              value={new Date(date).toISOString().split("T")[0]}
              onChange={handleDateChange}
            />
          </div>
          <div className={componentStyles.inputField}>
            <Button
              className={componentStyles.input}
              onClick={() => onSubmit(amount, merchant, date)}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default EditTransaction;
