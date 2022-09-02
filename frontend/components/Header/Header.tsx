import React from "react";
import styles from "styles/HeaderFooter.module.scss";
import Nav from "./Nav";
import Settings from "./Settings";
import { NextRouter, useRouter } from "next/router";
import Button from "components/base/Button";
import Link from "next/link";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";

const Header = () => {
  const router = useRouter();
  const isLoggedIn = useIsLoggedIn();
  const path = router.pathname.split("/")[1];
  return (
    <div className={styles.header}>
      <div className={styles.headerItem}>{isLoggedIn && <Settings />}</div>
      <div className={styles.headerItem}>
        <Link href="/">
          <a>
            <Button onClick={() => {}}>
              <div className={styles.headerItem}>
                {path ? path : "BudgetWise"}
              </div>
            </Button>
          </a>
        </Link>
      </div>
      <div className={styles.headerItem}>
        <Nav />
      </div>
    </div>
  );
};

export default Header;
