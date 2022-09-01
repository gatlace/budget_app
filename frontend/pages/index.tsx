import type { NextPage } from "next";
import pageStyles from "styles/Page.module.scss";
import { checkIfLoggedIn, IronSessionSSR } from "../lib/IronSession";

const Home: NextPage = () => {
  return (
    <>
      <h1 className={pageStyles.pageHeader}>Welcome to BudgetWise!</h1>
    </>
  );
};

export default Home;
