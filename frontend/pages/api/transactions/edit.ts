import { BACKEND_URL, IronSessionRoute } from "lib/IronSession";
import { NextApiRequest, NextApiResponse } from "next";

const editTransaction = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, amount, merchant, date } = req.body;

  const result = await fetch(`${BACKEND_URL}/transactions/edit/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${req.session["token"]}`,
    },
    body: JSON.stringify({ amount, merchant, date: date.split("T")[0] }),
  });

  if (result.status === 200) {
    res.status(200).json({ message: "Transaction updated" });
  }

  if (result.status === 401) {
    res.status(401).json({ message: "Unauthorized" });
  }

  if (result.status === 404) {
    res.status(404).json({ message: "Transaction not found" });
  }

  if (result.status === 500) {
    res.status(500).json({ message: "Server error" });
  }
};

export default IronSessionRoute(editTransaction);
