import React from "react";
import styles from "styles/Header/Header.module.scss";
import Nav from "./Nav";
import Settings from "./Settings/Settings";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.headerItem}>
        <Settings />
      </div>
      <div className={styles.headerItem}>Header</div>
      <div className={styles.headerItem}>
        <Nav />
      </div>
    </div>
  );
};

export default Header;
