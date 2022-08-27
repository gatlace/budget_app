import { NextApiRequest, NextApiResponse } from "next";

const checkIfLoggedIn = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.cookies.session) {
    res.status(200).json({ isLoggedIn: true });
  } else {
    res.status(200).json({ isLoggedIn: false });
  }
};
export default checkIfLoggedIn;
