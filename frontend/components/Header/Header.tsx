import React from "react";
import styles from "styles/Header/Header.module.scss";
import Nav from "./Nav";
import Settings from "./Settings";
import { useRouter } from "next/router";
import Button from "components/base/Button";
import Link from "next/link";

const Header = () => {
  const router = useRouter();
  const path = router.pathname.split("/")[1];
  return (
    <div className={styles.header}>
      <div className={styles.headerItem}>
        <Settings />
      </div>
      <Link href="/">
        <a>
          <Button onClick={() => {}}>
            <div className={styles.headerItem}>{path ? path : "BudgetWise"}</div>
          </Button>
        </a>
      </Link>
      <div className={styles.headerItem}>
        <Nav />
      </div>
    </div>
  );
};

export default Header;
