import { NextApiRequest, NextApiResponse} from "next";
import { BACKEND_URL, IronSessionRoute } from "../../../lib/IronSession";

const accountInfo = async (req: NextApiRequest, res: NextApiResponse) => {
  const info = await fetch(`${BACKEND_URL}/users/account_info/`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${req.session.token}`,
    },
  }).then((response) => response.json());

  res.status(200).json(info);

}

export default IronSessionRoute(accountInfo);