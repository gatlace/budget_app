import { GetServerSideProps } from 'next'
import React, { useEffect } from 'react'


const Dashboard = () => {
  const [transactions, setTransactions] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(true)

  useEffect(() => {
    fetch('/api/transactions')
      .then(res => res.json())
      .then(data => {
        setTransactions(data)
        setLoading(false)
      })
      console.log(transactions)
  }, [])

  return (
    <div>dashboard</div>
  )
}


export default Dashboard