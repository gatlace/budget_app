import React from "react";
import styles from "styles/Header/Header.module.scss";
import Nav from "./Nav";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.headerItem}>
        <h1>Settings</h1>
      </div>
      <div className={styles.headerItem}>Header</div>
      <div className={styles.headerItem}>
        <Nav />
      </div>
    </div>
  );
};

export default Header;
