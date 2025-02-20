import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Set-Cookie", "auth_token=; HttpOnly; Path=/; Max-Age=0");
  res.status(200).json({ message: "ログアウトしました。" });
}
