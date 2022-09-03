import React from "react";
import pageStyles from "styles/Page.module.scss";
import styles from "styles/Transactions.module.scss";
import { useRouter } from "next/router";
import Portal from "components/base/Portal";
import { AnimatePresence } from "framer-motion";
import EditTransaction from "./EditTransaction";
import { BACKEND_URL } from "bin/IronSession";
import Button from "components/base/Button";
import Link from "next/link";
import { Transaction } from "../../pages/merchants/[merchant]";

const Transactions = ({ transactions }: { transactions: Transaction[] }) => {
  const router = useRouter();
  const [currentTransaction, setCurrentTransaction] =
    React.useState<Transaction | null>(null);
  const isEditing = router.asPath.includes("edit");
  const [isCreating, setIsCreating] = React.useState(false);

  const handleSubmit = () => {
    setCurrentTransaction(null);
    setIsCreating(false);
    router.replace(router.asPath);
  };

  const handleClose = () => {
    setCurrentTransaction(null);
    setIsCreating(false);
    router.replace(router.asPath);
  };

  const dateStringToDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return new Date(Number(year), Number(month) - 1, Number(day));
  };

  const transactionsDisplay = transactions.map((transaction, index) => {
    return (
      <div
        key={index}
        className={styles.displayCard + (isEditing ? " " + styles.hover : "")}
        onClick={
          isEditing
            ? () => {
                setCurrentTransaction(transaction);
              }
            : undefined
        }
      >
        <div className="flex w-full justify-between px-2">
          <h2 className="text-sm">{transaction.merchant_name}</h2>
          {" "}
          <h2 className="text-sm ml-2">
            {dateStringToDate(
              transaction.date as unknown as string //only way to get the date formatted right
            ).toLocaleDateString("en-US")}
          </h2>
        </div>
        <h1 className="text-lg">${transaction.amount}</h1>
      </div>
    );
  });

  const header = (
    <h1>
      Transactions{" "}
      <span className="text-lg font-normal">
        (total: {transactions.length})
      </span>{" "}
      {isEditing && (
        <Button onClick={() => setIsCreating(true)}>
          <i className="fa-solid fa-plus" />
        </Button>
      )}
    </h1>
  );

  return (
    <>
      <div className={pageStyles.displayContainer}>
        <div className={pageStyles.displayHeader}>
          {!isEditing ? (
            <Link href="/transactions/edit">
              <a>
                <Button onClick={() => {}}>{header}</Button>
              </a>
            </Link>
          ) : (
            header
          )}
        </div>
        <div className={pageStyles.displayContent}>
          <div
            className={styles.scrollableContent}
          >
            {transactions.length > 0 ? (
              transactionsDisplay
            ) : (
              <h1 className="text-center">No transactions. Create one!</h1>
            )}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {(currentTransaction || isCreating) && (
          <EditTransaction
            isCreating={isCreating}
            currentTransaction={
              currentTransaction ? currentTransaction : undefined
            }
            onClose={handleClose}
            onSubmit={handleSubmit}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Transactions;
