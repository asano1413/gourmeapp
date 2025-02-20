import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function DirectMessage() {
  const [recipientId, setRecipientId] = useState('');
  const [content, setContent] = useState('');
  const [messageId, setMessageId] = useState('');
  const [messages, setMessages] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const router = useRouter();

  // メッセージ履歴を取得する関数
  const fetchMessages = async () => {
    const res = await fetch('/api/messages/history');
    if (res.ok) {
      const data = await res.json();
      setMessages(data);
    } else {
      alert('メッセージ履歴の取得に失敗しました');
    }
  };

  // フォロワーとフォロー中のユーザーを取得する関数
  const fetchFollowersAndFollowing = async () => {
    const res = await fetch('/api/user/followers-following');
    if (res.ok) {
      const data = await res.json();
      setFollowers(data.followers);
      setFollowing(data.following);
    } else {
      alert('フォロワーとフォロー中のユーザーの取得に失敗しました');
    }
  };

  useEffect(() => {
    fetchMessages();
    fetchFollowersAndFollowing();
  }, []);

  // メッセージを送信する関数
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/messages/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipientId, content }),
    });

    if (res.ok) {
      alert('メッセージが送信されました');
      setRecipientId('');
      setContent('');
      fetchMessages();
    } else {
      alert('メッセージの送信に失敗しました');
    }
  };

  // メッセージに返信する関数
  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/messages/receive', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messageId, content }),
    });

    if (res.ok) {
      alert('返信が送信されました');
      setMessageId('');
      setContent('');
      fetchMessages();
    } else {
      alert('返信の送信に失敗しました');
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded p-8 text-gray-700 w-full max-w-md mt-12 mx-auto">
        <h2 className="text-2xl my-4 font-bold text-gray-800 text-center">メッセージ送信</h2>
        <form onSubmit={handleSend} className="flex flex-col items-center">
          <p className="text-left">受信者ID</p>
          <select
            value={recipientId}
            onChange={(e) => setRecipientId(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded w-3/5"
          >
            <option value="">選択してください</option>
            {following.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
          <p className="text-left">メッセージ内容</p>
          <textarea
            placeholder="メッセージ内容"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded w-3/5"
          />
          <button type="submit" className="bg-blue-500 text-white my-4 px-4 py-2 rounded w-2/5">送信</button>
        </form>
      </div>

      <div className="bg-white shadow-md rounded p-8 text-gray-700 w-full max-w-md mt-12 mx-auto">
        <h2 className="text-2xl my-4 font-bold text-gray-800 text-center">メッセージ返信</h2>
        <form onSubmit={handleReply} className="flex flex-col items-center">
          <p className="text-left">メッセージID</p>
          <input
            type="text"
            placeholder="メッセージID"
            value={messageId}
            onChange={(e) => setMessageId(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded w-3/5"
          />
          <p className="text-left">返信内容</p>
          <textarea
            placeholder="返信内容"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded w-3/5"
          />
          <button type="submit" className="bg-blue-500 text-white my-4 px-4 py-2 rounded w-2/5">返信</button>
        </form>
      </div>

      <div className="bg-white shadow-md rounded p-8 text-gray-700 w-full max-w-md mt-12 mx-auto">
        <h2 className="text-2xl my-4 font-bold text-gray-800 text-center">メッセージ履歴</h2>
        <ul>
          {messages.map((message) => (
            <li key={message.id} className="mb-4 p-2 border border-gray-300 rounded">
              <p><strong>送信者ID:</strong> {message.senderId}</p>
              <p><strong>受信者ID:</strong> {message.recipientId}</p>
              <p><strong>内容:</strong> {message.content}</p>
              <p><strong>送信日時:</strong> {new Date(message.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}