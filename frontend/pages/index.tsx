import type { NextPage } from 'next'
import { useEffect } from 'react'

const Home: NextPage = () => {
  useEffect(() => {
    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({"username": "testuser", "password": "testpassword"})
        
    })
  } , [])

  return (
    <div>
      <h1>Hello</h1>
    </div>
  )
}

export default Home
