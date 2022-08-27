import type { NextPage } from "next";
import pageStyles from "styles/Page.module.scss";

const Home: NextPage = () => {
  return (
    <>
      <h1 className={pageStyles.pageHeader}>Welcome to BudgetWise!</h1>
    </>
  );
};

export default Home;
