import Transactions from "components/displays/Transactions";
import { BACKEND_URL, checkIfLoggedIn, IronSessionSSR } from "lib/IronSession";
import { Transaction } from "pages/dashboard";
import pageStyles from "styles/Page.module.scss";

type Props = {
  transactions: Transaction[];
};

const edit = (props: Props) => {
  return (
    <div className={pageStyles.pageContent}>
      <Transactions transactions={props.transactions} />
    </div>
  );
};

export const getServerSideProps = IronSessionSSR(async (ctx) => {
  const isLoggedIn = await checkIfLoggedIn(ctx);
  if (!isLoggedIn) {
    return {
      redirect: {
        destination: "/login",
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
