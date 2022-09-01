import { NextApiRequest, NextApiResponse } from "next";
import {
  BACKEND_URL,
  checkIfLoggedIn,
  IronSessionRoute,
} from "../../../../lib/IronSession";

const editLogin = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, currentPassword, newPassword } = req.body;
  if (!username || !currentPassword || !newPassword) {
    res.status(400).json({ error: "all fields required" });
    return;
  }

  const checkPassword = await fetch(`${BACKEND_URL}/users/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password: currentPassword }),
  });

  if (checkPassword.status !== 200) {
    res.status(400).json({ error: "invalid credentials" });
    return;
  }

  const response = await fetch(`${BACKEND_URL}/users/edit_login/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${req.session["token"]}`,
    },
    body: JSON.stringify({ username, password: newPassword }),
  });

  if (response.status === 401) {
    res.status(401).json({ error: "not logged in" });
    return;
  }

  if (response.status === 400) {
    res.status(400).json({ error: "please provide all credentials" });
    return;
  }

  if (response.status === 409) {
    res.status(409).json({ error: "username already exists" });
    return;
  }

  res.status(200).json({ message: "login updated" });
};

export default IronSessionRoute(editLogin);
