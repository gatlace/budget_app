import { BACKEND_URL, checkIfLoggedIn, IronSessionSSR } from 'lib/IronSession'
import React, { useEffect } from 'react'

type Props = {
    data: any
}

const dashboard = (props: Props) => {
  console.log(props.data)
  return (
    <div>dashboard</div>
  )
}

export const getServerSideProps = IronSessionSSR(
  async (ctx) => {
    const loggedIn = await checkIfLoggedIn(ctx);
    if (!loggedIn) {
      return {
        redirect: {
          destination: '/login',
          permanent: false
        }
      }
    }

    const result = await fetch(`${BACKEND_URL}/transactions/dashboard/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${ctx.req.session.token}`,
        },
    })
    .then(res => {
      console.log(res)
      return res.json()
    })
    .catch(err => {
      console.log(err)
      return {
        props: {
          data: []
        }
      }
    }
    );

    return {
      props: {
        data: result,
      }
    }
  }
)

export default dashboard