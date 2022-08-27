import React from "react";
import Button from "../base/Button";
import styles from "styles/Components.module.scss";
import { AnimatePresence } from "framer-motion";
import Portal from "components/base/Portal";
import { useRouter } from "next/router";
import useIsLoggedIn from "hooks/useIsLoggedIn";

const SettingsButton = () => {
  const isLoggedIn = useIsLoggedIn();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <div className="w-full h-full text-start">
        <Button onClick={() => (isLoggedIn? setIsOpen(true): {})}>
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
      func: async () => {
        await fetch("/api/logout");
        await router.push("/");
      },
    },
    {
      name: "Edit transactions",
      func: async () => {
        await router.push("/transactions/edit");
      },
    },
  ];
  return (
    <div className={styles.nav}>
      {settings.map(({ name, func }, index) => (
        <button
          key={index}
          className={styles.navItem}
          onClick={async () => {
            await func();
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
