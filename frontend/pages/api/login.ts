import { NextApiRequest, NextApiResponse } from "next";
import { resolve } from "path";

const BACKEND_URL = "localhost:8000"

interface SuccessResponse {
    success: boolean;
}

const tryLogin = async (req: NextApiRequest) => {
    const  { username, password } = JSON.parse(req.body);
    const response: Promise<SuccessResponse> = await fetch(`http://${BACKEND_URL}/login/`, {   
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password }),
    }).then(res => {
        return res.json();
    })

    return response;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.status(405).end();
        return;
    }

    tryLogin(req).then(response => {
        if (response.success) {
            res.status(200).json(response);
        } else {
            res.status(401).json(response)
        }
    })
}
