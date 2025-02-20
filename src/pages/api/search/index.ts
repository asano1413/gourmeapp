import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';  // Prisma クライアントをインポート
import { getSession } from 'next-auth/react';  // NextAuth セッション

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      return handleGet(req, res, id as string);
    case 'PUT':
      return handlePut(req, res, id as string);
    case 'DELETE':
      return handleDelete(req, res, id as string);
    default:
      return res.status(405).json({ message: 'Method Not Allowed' });
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse, id: string) {
  try {
    const post = await db.post.findUnique({
      where: { id },
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    return res.status(200).json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function handlePut(req: NextApiRequest, res: NextApiResponse, id: string) {
  const session = await getSession({ req });

  if (!session?.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { title, content } = req.body;

  try {
    const post = await db.post.update({
      where: { id },
      data: {
        title,
        content,
      },
    });

    return res.status(200).json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse, id: string) {
  const session = await getSession({ req });

  if (!session?.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    await db.post.delete({
      where: { id },
    });

    return res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}