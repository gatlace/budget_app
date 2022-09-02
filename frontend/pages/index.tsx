import type { NextPage } from "next";
import pageStyles from "styles/Page.module.scss";
import { checkIfLoggedIn, IronSessionSSR } from "../bin/IronSession";

const Home: NextPage = () => {
  return (
    <>
      <h1 className={pageStyles.pageHeader}>Welcome to BudgetWise!</h1>
      <h2 className="text-xl text-center">
        {"It's time to know your budget."}
      </h2>
      <div className={pageStyles.pageContent}>
        <div className={pageStyles.displayContainer}>
          <h1 className={pageStyles.displayHeader}>What is this?</h1>
          <div className={pageStyles.displayContent}>
            <p>
              {`BudgetWise is a web application that allows you to track your
                spending and budget. You can create a new account, log in, and
              create a new budget. You can then add transactions to your budget,
              and see how you're spending your money. You can also see how you're
              spending your money by merchant.`}
            </p>
          </div>
        </div>
        <div className={pageStyles.displayContainer}>
          <h1 className={pageStyles.displayHeader}>How does it work?</h1>
          <div className={pageStyles.displayContent}>
            <p >
              {`It's really simple. You create a new account, and then create a
              new budget. You can then add transactions to your budget, and see
              how you're spending your money. It's a very simple full-stack CRUD
              app with authentication.`}
            </p>
          </div>
        </div>
        <div className={pageStyles.displayContainer}>
          <h1 className={pageStyles.displayHeader}>Why did you make it?</h1>
          <div className={pageStyles.displayContent}>
            <p>
              {`I'm passionate about financial literacy, and I wanted to create
              an app that not only demonstrates that passion but also my 
              ability to create web applications. This is my first full-stack
              project, and I'm very proud of it. I might make it a rolling release,
              but for now, I'm just going to keep it as a proof of concept.`}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
