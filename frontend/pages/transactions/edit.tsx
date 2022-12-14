import Button from "components/base/Button";
import Transactions from "components/displays/Transactions";
import { BACKEND_URL, checkIfLoggedIn, IronSessionSSR } from "bin/IronSession";
import Link from "next/link";
import pageStyles from "styles/Page.module.scss";
import { Transaction } from "../merchants/[merchant]";

type Props = {
  transactions: Transaction[];
};

const edit = (props: Props) => {
  return (
    <div className={pageStyles.pageContent}>
      <Link href="/dashboard">
        <Button onClick={() => {}}>
          <a className={pageStyles.pageHeader}>Edit Transactions</a>
        </Button>
      </Link>
      <Transactions transactions={props.transactions} />
    </div>
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
  const transactions = await fetch(`${BACKEND_URL}/transactions/all`, {
    method: "GET",
    headers: {
      Authorization: `Token ${ctx.req.session["token"]}`,
    },
  }).then((res) => res.json());
  return {
    props: {
      ...transactions,
    },
  };
});
export default edit;
