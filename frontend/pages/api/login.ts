import { NextApiRequest, NextApiResponse } from "next";
import { IronSessionRoute, BACKEND_URL } from "lib/IronSession";
import { resourceLimits } from "worker_threads";

declare module "iron-session" {
  interface IronSessionData {
    token: string;
  }
}

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = req.body;

  if (!username || !password) {
    if (req.session.token) {
      res.status(200).json({ message: "Already logged in" });
      return;
    } else {
      res.status(400).json({ message: "Please provide username and password" });
      return;
    }
  }

  const result = await fetch(`${BACKEND_URL}/users/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then((res) => res.json())
    .catch((err) => {
      res.status(500).json({ message: "Something went wrong" });
      return;
    });

    console.log(result);

  if (result?.token !== undefined) {
    req.session.token = result.token;
    await req.session.save();
    res.status(200).json({ message: "Logged in" });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
};

export default IronSessionRoute(login);
