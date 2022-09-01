import React, { MouseEventHandler } from "react";
import loginStyles from "styles/pages/Form.module.scss";
import Button from "./base/Button";
import { useRouter } from "next/router";
import Form from "./base/Form";

const Register = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!username || !password || !passwordConfirm || !firstName || !lastName) {
      setError("Please fill out all fields");
      setLoading(false);
      return;
    }

    if (password !== passwordConfirm) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/account/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          username,
          password,
        }),
      });

      if (response.status === 200) {
        await router.push("/dashboard");
      }

      if (response.status === 401) {
        setError("Please fill out all fields");
      }

      if (response.status === 409) {
        setError("Username already exists");
      }

      if (response.status === 500) {
        setError("Server error");
      }
    } catch (e) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    {
      name: "firstName",
      value: firstName,
      type: "text",
      label: "First Name",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setFirstName(e.target.value),
    },
    {
      name: "lastName",
      value: lastName,
      type: "text",
      label: "Last Name",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setLastName(e.target.value),
    },
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
      value: password,
      type: "password",
      label: "Password",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setPassword(e.target.value),
    },
    {
      name: "passwordConfirm",
      value: passwordConfirm,
      label: "Confirm Password",
      type: "password",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setPasswordConfirm(e.target.value),
    },
  ];

  return (
    <Form
      fields={fields}
      onSubmit={handleSubmit}
      submitText={"Register"}
      isLoading={loading}
      error={error}
    />
  );
};

export default Register;
