import { BACKEND_URL, IronSessionRoute } from "bin/IronSession";
import { NextApiResponse, NextApiRequest } from "next";

const createTransaction = async (req: NextApiRequest, res: NextApiResponse) => {
  const { amount, merchant, date } = req.body;
  await fetch(`${BACKEND_URL}/transactions/create/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${req.session["token"]}`,
    },
    body: JSON.stringify({ amount, merchant, date: date.split("T")[0] }),
  }).catch((err) => console.log(err));

  res.status(200).json({ message: "Transaction created" });
};

export default IronSessionRoute(createTransaction);
