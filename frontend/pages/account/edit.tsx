import React, { useEffect } from "react";
import pageStyles from "styles/Page.module.scss";
import Button from "components/base/Button";
import formStyles from "styles/pages/Form.module.scss";
import PasswordInput from "components/base/PasswordInput";
import { useRouter } from "next/router";
import { checkIfLoggedIn, IronSessionSSR } from "../../bin/IronSession";
import Link from "next/link";
import Form from "../../components/base/Form";

const Edit = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [budget, setBudget] = React.useState(0);
  const [accountError, setAccountError] = React.useState("");
  const [accountLoading, setAccountLoading] = React.useState(false);

  const [error, setError] = React.useState("");

  const [username, setUsername] = React.useState("");
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [loginError, setLoginError] = React.useState("");
  const [loginLoading, setLoginLoading] = React.useState(false);

  useEffect(() => {
    const fetchAccount = async () => {
      const res = await fetch("/api/account/info", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      setUsername(data.username);
      setFirstName(data.account.first_name);
      setLastName(data.account.last_name);
      setBudget(data.account.budget);
    };
    fetchAccount();
  }, []);

  const router = useRouter();

  const accountFields = [
    {
      name: "firstName",
      value: firstName,
      label: "First Name",
      type: "text",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setFirstName(e.target.value),
    },
    {
      name: "lastName",
      value: lastName,
      label: "Last Name",
      type: "text",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setLastName(e.target.value),
    },
    {
      name: "budget",
      value: budget,
      label: "Budget",
      type: "number",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setBudget(parseInt(e.target.value)),
    },
  ];

  const loginFields = [
    {
      name: "username",
      value: username,
      label: "Username",
      type: "text",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setUsername(e.target.value),
    },
    {
      name: "password",
      value: currentPassword,
      label: "Current Password",
      type: "password",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setCurrentPassword(e.target.value),
    },
    {
      name: "newPassword",
      value: newPassword,
      label: "New Password",
      type: "password",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setNewPassword(e.target.value),
    },
    {
      name: "confirmPassword",
      value: confirmPassword,
      label: "Confirm Password",
      type: "password",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setConfirmPassword(e.target.value),
    },
  ];

  const handleAccountSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!firstName || !lastName || !budget) {
      setAccountError("Please fill out all fields");
      return;
    }
    setAccountLoading(true);
    setAccountError("");
    const res = await fetch("/api/account/edit/account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        budget: budget,
      }),
    });

    const data = await res.json();

    if (data.error) {
      setAccountError(data.error);
      setAccountLoading(false);
      return;
    }
    setAccountLoading(false);
    alert("Account updated");
  };

  const handleLoginSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!username || !currentPassword || !newPassword || !confirmPassword) {
      setLoginError("Please fill out all fields");
      return;
    }
    setLoginLoading(true);
    setLoginError("");
    const res = await fetch("/api/account/edit/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        currentPassword: currentPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      }),
    });

    const data = await res.json();

    if (data.error) {
      setLoginError(data.error);
      setLoginLoading(false);
      return;
    }

    setLoginLoading(false);
    alert("Login updated");
  }

  return (
    <>
      <h1 className={pageStyles.pageHeader}>
        <Button onClick={() => router.push("/dashboard")}>Edit Account</Button>
      </h1>

      <Form
        isLoading={accountLoading}
        error={accountError}
        fields={accountFields}
        onSubmit={handleAccountSubmit}
        submitText={"Save"}
        key={"account"}
      />
      <Form
        isLoading={loginLoading}
        error={loginError}
        fields={loginFields}
        onSubmit={handleLoginSubmit}
        submitText={"Save"}
        key={"login"}
      />
    </>
  );
};

export default Edit;

export const getServerSideProps = IronSessionSSR(async (ctx) => {
  if (!(await checkIfLoggedIn(ctx))) {
    return {
      redirect: {
        destination: "/account/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
});
