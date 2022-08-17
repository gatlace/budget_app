import React from "react";
import Button from "../../base/Button";
import styles from "styles/Components.module.scss";
import { AnimatePresence } from "framer-motion";
import Portal from "components/base/Portal";
import Link from "next/link";

type Props = {};

const SettingsButton = (props: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <div className="w-full h-full text-start">
        <Button onClick={() => setIsOpen(true)}>
          <i className="fas fa-cog fa-xl" />
        </Button>
      </div>
      {isOpen && (
        <AnimatePresence>
          <Portal
            onClose={() => setIsOpen(false)}
            styles="absolute left-4 top-20"
          >
            <Settings />
          </Portal>
        </AnimatePresence>
      )}
    </>
  );
};

const Settings = (props: Props) => {
  const settings = [
    {
      name: "Log out",
      href: "/logout",
    },
  ];
  return (
    <div className={styles.nav}>
      {settings.map(({ name, href }) => (
        <Link key={name} href={href}>
          <a className={styles.navItem}>{name}</a>
        </Link>
      ))}
    </div>
  );
};

export default SettingsButton;
