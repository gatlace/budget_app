import { NextApiRequest, NextApiResponse} from "next";
import { BACKEND_URL, IronSessionRoute } from "bin/IronSession";

const editAccount = async (req: NextApiRequest, res: NextApiResponse) => {
  const { firstName, lastName, budget } = req.body;
  if (!firstName || !lastName || !budget) {
    res.status(400).json({ error: "all fields required" });
    return;
  }
  const response = await fetch(`${BACKEND_URL}/users/edit_account/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${req.session["token"]}`,
    },
    body: JSON.stringify({ firstName, lastName, budget }),
  });

  if (response.status === 400) {
    res.status(400).json({ error: "please provide all credentials" });
    return;
  }
  if (response.status === 401) {
    res.status(401).json({ error: "not logged in" });
    return;
  }

  res.status(200).json({ message: "account updated" });
}

export default IronSessionRoute(editAccount);