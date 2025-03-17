import { prisma } from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'DELETE') {
    try {
      await prisma.notification.update({
        where: { id: Number(id) },
        data: { isRead: true },
      });

      res.status(200).json({ message: '通知が削除されました' });
    } catch (e) {
      res.status(500).json({ message: '通知の削除に失敗しました' });
    }

  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
