import React from "react";
import { IronSessionSSR } from "lib/IronSession";

type Props = {};

const transaction = (props: Props) => {
  return <>transaction</>;
};

export const getServerSideProps = IronSessionSSR(async (ctx) => {
  console.log(Object.keys(ctx.query));
  return {
    props: {},
  };
});

export default transaction;
