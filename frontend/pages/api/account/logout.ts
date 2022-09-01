import { IronSessionRoute } from "bin/IronSession";
import { NextApiRequest, NextApiResponse } from "next";

const logout = async (req: NextApiRequest, res: NextApiResponse) => {
  await req.session.destroy();
  res.redirect("/");
};

export default IronSessionRoute(logout);
