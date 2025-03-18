import { useEffect, useState } from 'react';
import AppLayout from '@/components/AppLayout';

interface Notice {
  id: number;
  title: string;
  content: string;
  date: string;
}

export default function NoticePage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch('/api/notices');
        if (!response.ok) {
          throw new Error(`Failed to fetch notices: ${response.statusText}`);
        }
        const data: Notice[] = await response.json();
        setNotices(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">お知らせ</h1>
        {loading ? (
          <p className="text-gray-500">読み込み中...</p>
        ) : error ? (
          <p className="text-red-500">エラーが発生しました: {error}</p>
        ) : notices.length > 0 ? (
          <ul className="space-y-4">
            {notices.map((notice) => (
              <li key={notice.id} className="border-b pb-4">
                <h2 className="text-xl font-semibold text-blue-600">{notice.title}</h2>
                <p className="text-gray-600 text-sm">{notice.date}</p>
                <p className="text-gray-700 mt-2">{notice.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">現在お知らせはありません。</p>
        )}
      </div>
    </AppLayout>
  );
}
