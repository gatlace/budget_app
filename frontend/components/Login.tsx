import React, { MouseEventHandler } from "react";
import Form from "./base/Form";
import { useRouter } from "next/router";

const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/account/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.status === 200) {
        await router.push("/dashboard");
      }

      if (response.status === 401) {
        setError("Invalid username or password");
      }

      if (response.status === 500) {
        setError("Server error");
      }
    } catch (e: any) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  const fields = [
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
      label: "Password",
      type: "password",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setPassword(e.target.value),
    },
  ];

  return (
    <Form
      fields={fields}
      onSubmit={handleSubmit}
      submitText={"Login"}
      error={error}
      isLoading={loading}
    />
  );
};

export default Login;
