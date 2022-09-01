import { NextApiRequest, NextApiResponse } from "next";
import { BACKEND_URL, IronSessionRoute } from "../../../lib/IronSession";

declare module "iron-session" {
  interface IronSessionData {
    token: string;
  }
}

const checkIfLoggedIn = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.session.token) {
    res.status(200).json({ isLoggedIn: false });
    return;
  }

  const response = await fetch(`${BACKEND_URL}/users/login/`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${req.session.token}`,
    },
  });

  if (response.status === 401) {
    res.status(401).json({ message: "wrong token" });
    return;
  }

res.status(200).json({ isLoggedIn: true });

};
export default IronSessionRoute(checkIfLoggedIn);
