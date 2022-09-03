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

//export const BACKEND_URL = "https://gatlace-budget-app-backend.herokuapp.com";
export const BACKEND_URL = "http://localhost:8000";

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
  if (!token) {
    return false;
  }

  const response = await fetch(`${BACKEND_URL}/users/login/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${token}`,
    },
  });

  return response.status === 200;
}
