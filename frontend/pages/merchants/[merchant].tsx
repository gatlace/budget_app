import Button from "components/base/Button";
import Transactions from "components/displays/Transactions";
import { BACKEND_URL, IronSessionSSR } from "bin/IronSession";
import Link from "next/link";
import pageStyles from "styles/Page.module.scss";

interface Props {
  merchant:     Merchant;
  transactions: Transaction[];
  percentage:   number;
  total:        number;
}

interface Merchant {
  name:  string;
  color: string;
  id:    number;
}

export interface Transaction {
  amount:        string;
  merchant_name: string;
  date:          Date;
  id:            number;
}


const merchant = (props: Props) => {
  return (
    <div className={pageStyles.pageContent}>
      <Link href="/dashboard">
        <Button onClick={() => {}}>
          <a className={pageStyles.pageHeader}>{props.merchant.name}</a>
        </Button>
      </Link>
      <div className={pageStyles.displayContainer}>
        <h1 className={pageStyles.displayHeader}>Stats</h1>
        <div className={pageStyles.displayContent}>
          <h2>Percentage: {props.percentage}%</h2>
          <h2>Total: ${props.total}</h2>
        </div>
      </div>
      <Transactions transactions={props.transactions} />
    </div>
  );
};

export const getServerSideProps = IronSessionSSR(async (ctx) => {
  const { merchant } = ctx.query;
  const data = await fetch(`${BACKEND_URL}/transactions/${merchant}`, {
    method: "GET",
    headers: {
      Authorization: `Token ${ctx.req.session["token"]}`,
    },
  }).then((res) => res.json());
  return {
    props: {
      ...data,
    },
  };
});

export default merchant;
