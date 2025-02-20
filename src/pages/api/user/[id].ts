import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';  // Prisma クライアントをインポート

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { id } = req.query;

  try {
    const user = await db.user.findUnique({
      where: { id: parseInt(id as string) },
      include: {
        followers: true,
        following: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}