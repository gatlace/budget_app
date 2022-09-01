import React from "react";
import Login from "components/Login";
import { checkIfLoggedIn, IronSessionSSR } from "bin/IronSession";
import pageStyles from "styles/Page.module.scss";
import Link from "next/link";
import Button from "components/base/Button";

const login = () => {
  return (
    <div className={pageStyles.pageContent}>
      <Login />
      <Link href="/account/register">
        <a>
          <Button onClick={() => {}}>
            <div className={pageStyles.displayContainer + " text-center"}>
              Don't have an account? Create one!
            </div>
          </Button>
        </a>
      </Link>
    </div>
  );
};

export const getServerSideProps = IronSessionSSR(async (ctx) => {
  const isLoggedIn = await checkIfLoggedIn(ctx);
  if (isLoggedIn) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
});

export default login;
