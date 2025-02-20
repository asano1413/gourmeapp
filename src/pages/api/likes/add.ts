import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';  // Prisma クライアントをインポート
import { getSession } from 'next-auth/react';  // NextAuth セッション

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { postId }: { postId: string } = req.body;
  const session = await getSession({ req });

  if (!session?.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // 既にいいねが存在するか確認
    const existingLike = await db.like.findUnique({
      where: {
        userId_postId: {
          userId: session.user.id,
          postId,
        },
      },
    });

    if (existingLike) {
      return res.status(400).json({ message: 'Like already exists' });
    }

    // いいねを登録
    await db.like.create({
      data: {
        userId: session.user.id,
        postId,
      },
    });

    return res.status(200).json({ message: 'Like added successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}