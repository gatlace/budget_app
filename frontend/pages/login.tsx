import React from 'react'
import Login from "components/Login"
import { IronSessionSSR, checkIfLoggedIn } from 'lib/IronSession'

type Props = {}

const login = (props: Props) => {
    return (
        <>
            <Login />
        </>
    )
}

export const getServerSideProps = IronSessionSSR(
    async (ctx) => {
        const loggedIn = await checkIfLoggedIn(ctx);
        if (loggedIn) {
            return {
                redirect: {
                    destination: '/dashboard',
                    permanent: false
                }
            }
        } else {
            return {
                props: {}
            }
        }
    }
)

export default login