import React from "react";
import styles from "styles/Header/Header.module.scss";
import Nav from "./Nav";
import Settings from "./Settings/Settings";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const path = router.pathname.split("/")[1];
  return (
    <div className={styles.header}>
      <div className={styles.headerItem}>
        <Settings />
      </div>
      <div className={styles.headerItem}>{path ? path : "BudgetWise"}</div>
      <div className={styles.headerItem}>
        <Nav />
      </div>
    </div>
  );
};

export default Header;
