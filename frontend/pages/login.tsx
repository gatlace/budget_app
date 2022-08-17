import React from "react";
import Login from "components/Login";
import { checkIfLoggedIn, IronSessionSSR } from "lib/IronSession";

const login = () => {
  return (
    <>
      <Login />
    </>
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
