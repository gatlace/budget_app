import React from "react";
import styles from "styles/HeaderFooter.module.scss"
import Button from "./base/Button";


const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerItem}>
        Created by&nbsp;
        <Button onClick={() => window.open("https://ziidonato.com", "_blank")}>
          Zii Donato&nbsp;&nbsp;
        </Button>
        <Button onClick={() => window.open("https://github.com/gatlace", "_blank")}>
          <i className={`fab fa-github fa-lg`}/>&nbsp;&nbsp;
        </Button>
        <Button onClick={() => window.open("https://www.linkedin.com/in/zii-donato/", "_blank")}>
          <i className={`fab fa-linkedin fa-lg`}/>
        </Button>
      </div>
      <div className={styles.footerItem}>
        May 2022
      </div>
    </div>
  );
};

export default Footer;