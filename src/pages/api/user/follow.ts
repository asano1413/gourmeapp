import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';  // Prisma クライアントをインポート
import { getSession } from 'next-auth/react';  // NextAuth セッション

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const session = await getSession({ req });

  if (!session?.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { userId } = req.body;

  try {
    const follow = await db.follow.create({
      data: {
        followerId: session.user.id,
        followingId: parseInt(userId),
      },
    });

    return res.status(200).json(follow);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}