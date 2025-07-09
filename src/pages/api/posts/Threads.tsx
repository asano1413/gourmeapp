import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/AppLayout';

interface Thread {
  id: number;
  title: string;
  content: string;
}

const ThreadsPage = () => {
  const [threads, setThreads] = useState<Thread[]>([]);

  useEffect(() => {
    // スレッドデータを取得する処理
    const fetchThreads = async () => {
      try {
        const response = await fetch('/api/posts');
        const data = await response.json();
        setThreads(data);
      } catch (error) {
        console.error('Failed to fetch threads:', error);
      }
    };

    fetchThreads();
  }, []);

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">スレッド</h1>

        <div className="max-w-4xl mx-auto">
          {threads.length > 0 ? (
            <div className="space-y-4">
              {threads.map((thread: Thread, index: number) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-2">{thread.title}</h3>
                  <p className="text-gray-600">{thread.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <p className="text-gray-600">まだスレッドがありません。</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default ThreadsPage;
