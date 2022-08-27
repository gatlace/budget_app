import { NextApiRequest, NextApiResponse} from "next";
import { BACKEND_URL, IronSessionRoute } from "../../lib/IronSession";

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  const {username, password} = req.body;
  if (!username || !password) {
    res.status(400).json({error: "username and password required"});
    return;
  }

  const response = await fetch(`${BACKEND_URL}/users/new/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({username, password}),
  });

  if (response.status === 409) {
    res.status(409).json({error: "username already exists"});
    return;
  }

  req.session.token = await response.json().then((data) => data.token);
  await req.session.save();
    res.status(200).json({message: "account created"});
}

export default IronSessionRoute(register);