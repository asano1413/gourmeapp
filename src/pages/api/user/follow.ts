import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/db'; // MariaDB接続

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const userId = req.body?.userId; // ログインユーザーのIDを取得

  if (req.method === 'GET') {
    const isFollowing = await prisma.follow.findFirst({
      where: { followerId: userId, followingId: id },
    });
    return res.json({ isFollowing: Boolean(isFollowing) });
  }

  if (req.method === 'POST') {
    await prisma.follow.create({ data: { followerId: userId, followingId: id } });
    return res.status(200).json({ message: 'フォローしました' });
  }

  if (req.method === 'DELETE') {
    await prisma.follow.deleteMany({ where: { followerId: userId, followingId: id } });
    return res.status(200).json({ message: 'フォロー解除しました' });
  }

  res.status(405).json({ error: 'Method Not Allowed' });
}
