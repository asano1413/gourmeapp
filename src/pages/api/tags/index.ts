import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';  // Prisma クライアントをインポート

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const tags = await db.tag.findMany({
      orderBy: { name: 'asc' },
    });

    return res.status(200).json(tags);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}