import { BACKEND_URL, checkIfLoggedIn, IronSessionSSR } from "bin/IronSession";
import React from "react";
import pageStyles from "styles/Page.module.scss";
import MerchantPie from "components/displays/MerchantPie";
import { useRouter } from "next/router";
import Transactions from "components/displays/Transactions";

interface Props {
  merchants: Merchant[];
  account: Account;
  transactions: Transaction[];
}

interface Account {
  first_name: string;
  last_name: string;
  budget: number;
  balance: number;
}

interface Merchant {
  name: string;
  percentage: number;
  color: string;
}

export interface Transaction {
  amount: number;
  merchant: string;
  date: Date;
  id: number;
}

const dashboard = (props: Props) => {
  const { merchants, account, transactions, } = props;

  console.log(merchants);

  const colors = merchants.map(merchant => merchant.color);

  const merchantData = merchants
    .map((merchant, index) => {
      return {
        title: merchant.name,
        value: merchant.percentage,
        color: merchant.color,
      };
    })
    .sort((a, b) => b.value - a.value);

  return (
    <>
      <h1
        className={pageStyles.pageHeader}
      >{`${account.first_name} ${account.last_name}`}</h1>
      <div className={pageStyles.pageContent}>
        <div className={pageStyles.displayContainer}>
          <h1 className={pageStyles.displayHeader}>Budget</h1>
          <div className={pageStyles.displayContent}>
            <h1 className="text-2xl">${(account.budget - account.balance).toFixed(2)}</h1>
            <h2>
              ${account.budget} - ${account.balance}
            </h2>
          </div>
        </div>
        <MerchantPie merchants={merchantData} />
        <Transactions transactions={transactions} />
      </div>
    </>
  );
};

export const getServerSideProps = IronSessionSSR(async (ctx) => {
  const isLoggedIn = await checkIfLoggedIn(ctx);
  if (!isLoggedIn) {
    return {
      redirect: {
        destination: "/account/login",
        permanent: false,
      },
    };
  }

  const data = await fetch(`${BACKEND_URL}/transactions/dashboard/`, {
    headers: {
      Authorization: `Token ${ctx.req.session["token"]}`,
    },
  }).then((res) => res.json())
    .then((data) => {
      return data;
    });
  return {
    props: { ...data },
  };
});

export default dashboard;
