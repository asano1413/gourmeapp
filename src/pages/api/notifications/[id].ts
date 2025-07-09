import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { id } = req.query;
    const notification = await prisma.notification.update({
      where: { id: Number(id) },
      data: { isRead: true },
    });

    res.status(200).json(notification);
  } catch (error) {
    console.error('Notification update error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
