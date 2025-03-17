import { prisma } from '@/lib/db';
import { Notification } from '@prisma/client';
import { NextApiHandler } from 'next';

export type APINotificationsResponse = {
  unreadCount: number;
  notifications: Notification[];
}

const handler: NextApiHandler<APINotificationsResponse> = async (req, res) => {
if (req.method === 'GET') {
    const notifications = await prisma.notification.findMany();
    const unreadCount = notifications.filter((n) => !n.isRead).length;

    res.status(200).json({
      unreadCount,
      notifications,
    });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;
