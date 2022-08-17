import { BACKEND_URL, IronSessionRoute } from "lib/IronSession";
import { NextApiHandler } from "next";

const get_summary: NextApiHandler = async (req, res) => {
  if (!req.session.token) {
    res.status(401).json({ message: "Not logged in" });
    return;
  }

  const result = await fetch(`${BACKEND_URL}/account_summary/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${req.session.token}`,
    },
  }).then((res) => res.json());

  if (result.status === 200) {
    res.status(200).json(result.data);
  }

  if (result.status === 404) {
    res.status(404).json({ message: "No transactions found" });
  }
};

export default IronSessionRoute(get_summary);
