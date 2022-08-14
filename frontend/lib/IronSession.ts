import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next';
import { 
    NextApiHandler, 
    GetServerSidePropsContext, 
    GetServerSidePropsResult,
    NextApiRequest,
    NextApiResponse
} from 'next';

const sessionOptions = {
    cookieName: 'session',
    password: "GkMHmgXpXnHwWSMpxQROG6rZ1WwNbWBX",
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
    },
};

export const BACKEND_URL = "http://localhost:8000";

export const IronSessionRoute = (handler: NextApiHandler) => {
    return withIronSessionApiRoute(handler, sessionOptions);
}

export function IronSessionSSR<
  P extends { [key: string]: unknown } = { [key: string]: unknown },
>(
  handler: (
    context: GetServerSidePropsContext,
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>,
) {
  return withIronSessionSsr(handler, sessionOptions);
}

export const checkIfLoggedIn = async (context: GetServerSidePropsContext) => {
  const { token } = context.req.session;
    if (token) {
        return true;
    } else {
        return false;
    }
}