import React from "react";
import Button from "../../base/Button";
import styles from "styles/Components.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import Portal from "components/base/Portal";
import Link from "next/link";
import { useRouter } from "next/router";
import { checkIfLoggedIn } from "lib/IronSession";

type Props = {};

const SettingsButton = (props: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <div className="w-full h-full text-start">
        <Button onClick={() => setIsOpen(true)}>
          <i aria-hidden className="fas fa-cog fa-xl" />
        </Button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <Portal
            onClose={() => setIsOpen(false)}
            styles="absolute left-4 top-20"
          >
            <Settings onClick={() => setIsOpen(false)} />
          </Portal>
        )}
      </AnimatePresence>
    </>
  );
};

const Settings = (props: { onClick: () => void }) => {
  const router = useRouter();
  const settings = [
    {
      name: "Log out",
      func: () => {
        fetch("/api/logout").then((_) => router.push("/"));
      },
    },
    {
      name: "Edit transactions",
      func: () => {
        router.push("/transactions/edit");
      },
    },
  ];
  return (
    <div className={styles.nav}>
      {settings.map(({ name, func }) => (
        <button
          key={name}
          className={styles.navItem}
          onClick={() => {
            func();
            props.onClick();
          }}
        >
          <span className={styles.navItem}>{name}</span>
        </button>
      ))}
    </div>
  );
};

export default SettingsButton;
