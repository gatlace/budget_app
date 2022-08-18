import React, { MouseEventHandler } from "react";
import styles from "styles/pages/Login.module.scss";
import pageStyles from "styles/Page.module.scss";
import Button from "components/base/Button";
import { useRouter } from "next/router";
import { checkIfLoggedIn, IronSessionSSR } from "lib/IronSession";

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
        router.push("dashboard");
      }

      if (response.status === 401) {
        setError("Invalid username or password");
      }

      if (response.status === 500) {
        setError("Something went wrong");
      }
    } catch (e) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full h-full flex-col items-center">
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
            Username
          </label>
          <input
            type="password"
            id="password"
            className={styles.input + " m-2"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className={styles.input}>{error}</div>}
        <div className={styles.input}>
          <Button className={styles.loginButton} onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
