import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password } = req.body;

  try {
    const user = await db.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "メールアドレスまたはパスワードが間違っています。" });
    }

    // JWTを発行
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: "1h" });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error during authentication:", error);
    res.status(500).json({ error: "サーバーエラーが発生しました。" });
  }
}