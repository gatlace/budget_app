import { BACKEND_URL, checkIfLoggedIn, IronSessionSSR } from 'lib/IronSession'
import React from 'react'

type Props = {
    transactions: any[]
}

const transactions = (props: Props) => {
    console.log(props.transactions)
  return (
    <div>transactions</div>
  )
}

export const getServerSideProps = IronSessionSSR(
    async (ctx) => {
        const isLoggedIn = await checkIfLoggedIn(ctx);
        if (!isLoggedIn) {
            return {
                redirect: {
                    destination: '/login',
                    permanent: false
                }
            }
        }
        const result = await fetch(
            `${BACKEND_URL}/transactions/all/`, {
                headers: {
                    'Authorization': `Token ${ctx.req.session.token}`,
                }
            })
            .then(res => {
                return res.json()
            })
        return {
            props: {
                transactions: result,
            }
        }
    }
)

export default transactions