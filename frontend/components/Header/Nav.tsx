import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Portal from "../base/Portal";
import Button from "../base/Button";
import styles from "styles/Components.module.scss";
import Link from "next/link";

const NavButton = (props: { isLoggedIn: boolean }) => {
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
            <Nav onClose={handleClose} isLoggedIn={props.isLoggedIn} />
          </Portal>
        )}
      </AnimatePresence>
    </>
  );
};

const Nav = (props: { onClose: () => void; isLoggedIn: boolean }) => {
  const links = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Login/Register",
      href: "/login",
    },
    {
      name: "Dashboard",
      href: "/dashboard",
    },
    {
      name: "Transactions",
      href: "/transactions",
    },
  ];

  const navItems = links.map(({ name, href }) => (
    <Link key={name} href={href}>
      <a className={styles.navItem} onClick={props.onClose}>
        {name}
      </a>
    </Link>
  ));
  return <div className={styles.nav}>{navItems}</div>;
};

export default NavButton;
