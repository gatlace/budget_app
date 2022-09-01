import Button from "components/base/Button";
import Register from "components/Register";
import Link from "next/link";
import React from "react";
import pageStyles from "styles/Page.module.scss";

const register = () => {
  return (
    <div className={pageStyles.pageContent}>
      <Register />
      <Link href="/account/login">
        <Button onClick={() => {}}>
          <div className={pageStyles.displayContainer + " text-center"}>
            Already have an account? Login!
          </div>
        </Button>
      </Link>
    </div>
  );
};

export default register;
