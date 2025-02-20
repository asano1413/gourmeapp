import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  // ユーザー情報を取得する関数
  const fetchUser = async () => {
    const res = await fetch(`/api/user/${id}`);
    if (res.ok) {
      const data = await res.json();
      setUser(data);
      setName(data.name);
      setEmail(data.email);
      // フォロー状態を確認するロジックを追加
      // setIsFollowing(フォロー状態);
    } else {
      alert('ユーザー情報の取得に失敗しました');
    }
  };

  useEffect(() => {
    if (id) {
      fetchUser();
    }
  }, [id]);

  // プロフィールを更新する関数
  const handleUpdate = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/user/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    });

    if (res.ok) {
      alert('プロフィールが更新されました');
      setIsEditing(false);
      fetchUser();
    } else {
      alert('プロフィールの更新に失敗しました');
    }
  };

  // フォローする関数
  const handleFollow = async () => {
    const res = await fetch('/api/user/follow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: id }),
    });

    if (res.ok) {
      alert('フォローしました');
      setIsFollowing(true);
    } else {
      alert('フォローに失敗しました');
    }
  };

  // フォローを解除する関数
  const handleUnfollow = async () => {
    const res = await fetch('/api/user/unfollow', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: id }),
    });

    if (res.ok) {
      alert('フォローを解除しました');
      setIsFollowing(false);
    } else {
      alert('フォロー解除に失敗しました');
    }
  };

  if (!user) {
    return <div>読み込み中...</div>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded p-8 text-gray-700 w-full max-w-md mt-12 mx-auto">
        <h2 className="text-2xl my-4 font-bold text-gray-800 text-center">プロフィール</h2>
        {isEditing ? (
          <form onSubmit={handleUpdate} className="flex flex-col items-center">
            <p className="text-left">名前</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mb-4 p-2 border border-gray-300 rounded w-3/5"
            />
            <p className="text-left">メールアドレス</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4 p-2 border border-gray-300 rounded w-3/5"
            />
            <button type="submit" className="bg-blue-500 text-white my-4 px-4 py-2 rounded w-2/5">更新</button>
            <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white my-4 px-4 py-2 rounded w-2/5">キャンセル</button>
          </form>
        ) : (
          <div className="flex flex-col items-center">
            <p><strong>名前:</strong> {user.name}</p>
            <p><strong>メールアドレス:</strong> {user.email}</p>
            <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white my-4 px-4 py-2 rounded w-2/5">編集</button>
            {isFollowing ? (
              <button onClick={handleUnfollow} className="bg-red-500 text-white my-4 px-4 py-2 rounded w-2/5">フォロー解除</button>
            ) : (
              <button onClick={handleFollow} className="bg-green-500 text-white my-4 px-4 py-2 rounded w-2/5">フォロー</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}