import { checkIfLoggedIn, IronSessionSSR } from "lib/IronSession";
import React from "react";

const dashboard = () => {
  return <div>dashboard</div>;
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

  fetch("/");
  return {
    props: {},
  };
});

export default dashboard;
