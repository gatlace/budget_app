import React from 'react'
import Router, { useRouter } from 'next/router'
import { IronSessionSSR } from 'lib/IronSession'
import styles from "styles/Components.module.scss";

const Login = () => {
    const router = useRouter()
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [error, setError] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        console.log(username, password);
        setLoading(true);

        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username,password})
        })
        .then(res => {
            if (res.status === 200) {
                router.push('/dashboard')
            } else {
                setError('Invalid username or password')
                setLoading(false)
            }
        })
    }

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }
    
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

  return (
    <div className="flex flex-col">
        <div className={styles.form}>
            <div className={styles.formItem}>
                <label htmlFor="username" className={styles.label}>Username</label>
                <input
                    className={styles.input}
                    type="text" 
                    name="username"
                    placeholder="username"
                    onChange={handleUsernameChange}
                />
            </div>
            <div className={styles.formItem}>
                <label htmlFor="password" className={styles.label}>Password</label>
                <input
                    className={styles.input}
                    type="password" 
                    name="password"
                    placeholder="password" 
                    onChange={handlePasswordChange}
                />
            </div>
            {error && <div className="text-red-500">{error}</div>}
            <div className={styles.formItem}>
                <button className={styles.button} onClick={handleSubmit}>
                    {loading ? 'Loading...' : 'Login'}
                </button>
            </div>
        </div>
    </div>
  )
}

export default Login