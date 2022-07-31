import { useEffect, useState } from 'react'
import styles from '../styles/Login.module.scss'

const Login = () => {
  const [username, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const success = await fetch('/api/transactions', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });
    if (success.status === 200) {
      window.location.href = '/dashboard'
    } else {
      setError('Invalid username or password')
    }
  }


  return (
    <div className={styles.main}>
      <form className={styles.login_form} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input 
          type="text"
          id="username"
          value={username}
          onChange={e => setEmail(e.target.value)} 
        />
      </div>
        <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login