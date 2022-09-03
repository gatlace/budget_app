import Portal from "components/base/Portal";
import React from "react";
import styles from "styles/Transactions.module.scss";
import pageStyles from "styles/Page.module.scss";
import componentStyles from "styles/Components.module.scss";
import Button from "components/base/Button";
import { Transaction } from "../../pages/merchants/[merchant]";

type Props = {
  currentTransaction?: Transaction;
  isCreating: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

const EditTransaction = (props: Props) => {
  const { currentTransaction, onClose } = props;
  const [amount, setAmount] = React.useState(
    currentTransaction ? currentTransaction.amount : 0
  );
  const [merchant, setMerchant] = React.useState(
    currentTransaction ? currentTransaction.merchant_name : ""
  );
  const [date, setDate] = React.useState(
    currentTransaction ? new Date(currentTransaction.date) : new Date()
  );

  const handleSubmit = async () => {
    if (!currentTransaction) {
      return;
    }
    await fetch(`/api/transactions/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: currentTransaction.id,
        amount,
        merchant,
        date,
      }),
    }).catch(console.error);
    props.onClose();
  };

  const handleDelete = async () => {
    if (!currentTransaction) {
      return;
    }
    await fetch(`/api/transactions/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: currentTransaction.id,
      }),
    }).catch(console.error);
    props.onSubmit();
  };

  const handleCreate = async () => {
    await fetch(`/api/transactions/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        merchant,
        date,
      }),
    }).catch(console.error);
    props.onSubmit();
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseFloat(e.target.value));
  };
  const handleMerchantChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMerchant(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(new Date(e.target.value));
  };

  const checkIfDateIsValid = (date: any) => {
    return date instanceof Date && !isNaN(date.valueOf());
  }

  return (
    <Portal onClose={onClose} styles="flex justify-center items-center">
      <div className={styles.editTransaction}>
        <div className={pageStyles.displayContainer}>
          <h1 className={pageStyles.displayHeader}>Edit Transaction</h1>
          <div className={pageStyles.displayContent}></div>
          <div className={componentStyles.inputField}>
            <label className="w-full text-center">Amount</label>
            <input
              className={componentStyles.input}
              type="number"
              placeholder={
                currentTransaction
                  ? (currentTransaction.amount as unknown as string)
                  : ""
              }
              value={amount as unknown as string}
              onChange={handleAmountChange}
            />
          </div>
          <div className={componentStyles.inputField + " justify-start"}>
            <label className="w-28 text-center">Merchant</label>
            <input
              className={componentStyles.input}
              type="text"
              placeholder={
                currentTransaction
                  ? (currentTransaction.merchant_name as unknown as string)
                  : ""
              }
              value={merchant as string}
              onChange={handleMerchantChange}
            />
          </div>
          <div className={componentStyles.inputField + " justify-start"}>
            <label className="mx-10">Date</label>
            <input
              className={componentStyles.input}
              type="date"
              placeholder={
                currentTransaction
                  ? (currentTransaction.date as unknown as string)
                  : ""
              }
              value={checkIfDateIsValid(date)? new Date(date).toISOString().split("T")[0]: ""}
              onChange={handleDateChange}
            />
          </div>
          <div
            className={
              "flex justify-" + (!props.isCreating ? "between" : "center")
            }
          >
            <Button
              className={componentStyles.input}
              onClick={!props.isCreating ? handleSubmit : handleCreate}
            >
              Submit
            </Button>
            {!props.isCreating && (
              <Button
                className={componentStyles.input + " bg-red-900"}
                onClick={handleDelete}
              >
                Delete
              </Button>
            )}
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default EditTransaction;
