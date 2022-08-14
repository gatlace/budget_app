import { BACKEND_URL, checkIfLoggedIn, IronSessionSSR } from 'lib/IronSession'
import React from 'react'

type Props = {
    merchant: string,
    percentage: number,
    transactions: {}[],
}

const merchant = (props: Props) => {
    console.log(props)
  return (
    <div>
        <h1>{props.merchant}</h1>
    </div>
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
        
        const { merchant } = ctx.query
        const result = await fetch(`${BACKEND_URL}/transactions/${merchant}/`, {
            headers: {
                'Authorization': `Token ${ctx.req.session.token}`,
            }
        })
            .then(res => {
                return res.json()
            })
        return {
            props: {
                ...result
            },
        }
    }
)

export default merchant