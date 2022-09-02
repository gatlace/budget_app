import Nav from "../base/Nav";
import { useRouter } from "next/router";

const WebsiteNav = () => {
  const router = useRouter();

  const links = [
    {
      name: "Home",
      func: async () => {
        await router.push("/");
      },
    },
    {
      name: "Log in",
      func: async () => {
        await router.push("/account/login");
      },
    },
    {
      name: "Sign up",
      func: async () => {
        await router.push("/account/register");
      },
    },
  ];
  const loggedInLinks = [
    {
      name: "Home",
      func: async () => {
        await router.push("/");
      },
    },
    {
      name: "Log out",
      func: async () => {
        await fetch("/api/account/logout");
        await router.push("/");
      },
    },
    {
      name: "Dashboard",
      func: async () => await router.push("/dashboard"),
    },
  ];
  const icon = <i className="fas fa-bars fa-lg"/>;

  return (
    <Nav
      links={links}
      loggedInLinks={loggedInLinks}
      icon={icon}
      align={'end'}
    />
  );
};

export default WebsiteNav;