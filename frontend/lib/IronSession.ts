import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import {
  NextApiHandler,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";

const sessionOptions = {
  cookieName: "session",
  password: "GkMHmgXpXnHwWSMpxQROG6rZ1WwNbWBX",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export const BACKEND_URL = "https://gatlace-budget-app-backend.herokuapp.com";

export const IronSessionRoute = (handler: NextApiHandler) => {
  return withIronSessionApiRoute(handler, sessionOptions);
};

export function IronSessionSSR<
  P extends { [key: string]: unknown } = { [key: string]: unknown }
>(
  handler: (
    context: GetServerSidePropsContext
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
  return withIronSessionSsr(handler, sessionOptions);
}

export const checkIfLoggedIn = async (context: GetServerSidePropsContext) => {
  const { token } = context.req.session;
  return !!token;
};
