import { BACKEND_URL, IronSessionRoute } from "lib/IronSession";

const deleteTransaction = IronSessionRoute(async (req, res) => {
  const { id } = req.body;
  await fetch(`${BACKEND_URL}/transactions/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${req.session["token"]}`,
    },
  }).catch((err) => console.log(err));

  res.status(200).json({ message: "Transaction deleted" });
});

export default deleteTransaction;
