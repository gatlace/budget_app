import React, { MouseEventHandler } from "react";
import loginStyles from "styles/pages/Login.module.scss";
import Button from "./base/Button";
import { useRouter } from "next/router";

const Register = () => {
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
      const response = await fetch("/api/register", {
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
        await router.push("dashboard");
      }

      if (response.status === 401) {
        setError("Invalid username or password");
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

  return (
    <div className="flex flex-col grow-1 items-center">
      <div className={loginStyles.loginForm}>
        <div className={loginStyles.inputField}>
          <label htmlFor="username" className="mx-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            className={loginStyles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={loginStyles.inputField}>
          <label htmlFor="password" className="mx-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className={loginStyles.input + " m-2"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button onClick={handleSubmit} className={loginStyles.input}>
          <div className={loginStyles.loginButton}>
            {loading ? "Loading..." : "Register"}
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Register;
