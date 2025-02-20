import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';  // Prisma クライアントをインポート
import { getSession } from 'next-auth/react';  // NextAuth セッション

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const session = await getSession({ req });

  if (!session?.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: 'Tag ID is required' });
  }

  try {
    await db.tag.delete({
      where: { id },
    });

    return res.status(200).json({ message: 'Tag deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}