import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/db';  // Prisma クライアントをインポート
import { auth } from '@/auth';  // NextAuth セッション

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await auth();

  if (!session?.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
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
