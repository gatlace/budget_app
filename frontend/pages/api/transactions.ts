import { NextApiRequest, NextApiResponse } from "next";

const BACKEND_URL = "http://localhost:8000/transactions/";

const getTransactions = async () => {
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        res.status(405).end();
        return;
    }

    const transactiopns: Promise<object> = fetch(BACKEND_URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(res => {
        console.log(res);
        return res.json();
    })

    res.status(200).json(transactiopns);
}