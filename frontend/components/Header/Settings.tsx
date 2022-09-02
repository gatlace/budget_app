import React from "react";
import Nav from "../base/Nav";
import { useRouter } from "next/router";

const Settings = () => {
  const router = useRouter();

  const links = [
    {
      name: "Edit transactions",
      func: async () => {
        await router.push("/transactions/edit");
      },
    },
    {
      name: "Edit Account",
      func: async () => {
        await router.push("/account/edit");
      }
    }
  ];
  const icon = <i className="fas fa-cog fa-lg"/>;

  return (
    <Nav
      links={[]}
      loggedInLinks={links}
      icon={icon}
      align={'start'}

    />
  );

};

export default Settings;