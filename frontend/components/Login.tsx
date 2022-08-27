import React, { MouseEventHandler } from "react";
import styles from "styles/pages/Login.module.scss";
import Button from "components/base/Button";
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
      const response = await fetch("/api/login", {
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
    } catch (e: any) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex grow-1 flex-col items-center">
      <div className={styles.loginForm}>
        <div className={styles.inputField}>
          <label htmlFor="username" className="mx-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            className={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.inputField}>
          <label htmlFor="password" className="mx-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className={styles.input}>{error}</div>}
        <Button className={styles.input} onClick={handleSubmit}>
          <div className={styles.loginButton}>
            {loading ? "Loading..." : "Login"}
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Login;
