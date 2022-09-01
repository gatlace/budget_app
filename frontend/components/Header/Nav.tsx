import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Portal from "../base/Portal";
import Button from "../base/Button";
import styles from "styles/Components.module.scss";
import useIsLoggedIn from "hooks/useIsLoggedIn";
import { useRouter } from "next/router";

const NavButton = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <div className="w-full h-full text-end">
        <Button onClick={() => setIsOpen(true)}>
          <i aria-hidden className="fas fa-bars fa-xl" />
        </Button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <Portal onClose={handleClose} styles="absolute right-4 top-20">
            <Nav onClose={handleClose} />
          </Portal>
        )}
      </AnimatePresence>
    </>
  );
};

const Nav = (props: { onClose: () => void }) => {
  const isLoggedIn = useIsLoggedIn();
  const router = useRouter();

  const links = [
    {
      name: "Home",
      func: () => router.push("/"),
    },
    !isLoggedIn
      ? {
          name: "Login/Register",
          func: () => router.push("/account/login"),
        }
      : {
          name: "Log out",
          func: async () => {
            await fetch("/api/account/logout");
            await router.push("/");
          },
        },
    {
      name: "Dashboard",
      func: () => router.push("/dashboard"),
    },
  ];

  const navItems = links.map(({ name, func }, index) => (
    <button
      key={index}
      className={styles.navItem}
      onClick={() => {
        func();
        props.onClose();
      }}
    >
      {name}
    </button>
  ));
  return <div className={styles.nav}>{navItems}</div>;
};

export default NavButton;
