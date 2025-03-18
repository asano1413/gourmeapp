import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // ダミーお知らせデータ
    const notices = [
      { id: 1, title: 'メンテナンスのお知らせ', content: '2025年3月20日にシステムメンテナンスを実施します。', date: '2025-03-18' },
      { id: 2, title: '新機能リリース', content: '新しい検索機能を追加しました！ぜひお試しください。', date: '2025-03-15' },
      { id: 3, title: '重要なお知らせ', content: 'プライバシーポリシーを更新しました。詳細はリンクをご確認ください。', date: '2025-03-10' },
    ];

    res.status(200).json(notices);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
