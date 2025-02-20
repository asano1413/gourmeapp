import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (session) {
    // セッションが存在する場合、セッション情報を返す
    res.status(200).json({ session });
  } else {
    // セッションが存在しない場合、401 Unauthorizedを返す
    res.status(401).json({ message: 'Unauthorized' });
  }
}