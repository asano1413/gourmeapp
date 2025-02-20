import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';  // Prisma クライアントをインポート
import { getSession } from 'next-auth/react';  // NextAuth セッション

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { messageId, content }: { messageId: string, content: string } = req.body;
  const session = await getSession({ req });

  if (!session?.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const originalMessage = await db.message.findUnique({
      where: { id: messageId },
    });

    if (!originalMessage) {
      return res.status(404).json({ message: 'Original message not found' });
    }

    const replyMessage = await db.message.create({
      data: {
        senderId: session.user.id,
        recipientId: originalMessage.senderId,
        content,
        replyToId: messageId,
      },
    });

    return res.status(200).json({ message: 'Reply sent successfully', data: replyMessage });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}