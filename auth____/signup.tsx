import { useState } from 'react';
import { useRouter } from 'next/router';
import React from 'react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('パスワードが一致しません');
      return;
    }

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      alert('登録が成功しました！');
      router.push('/auth/signin');
    } else {
      alert('登録に失敗しました');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded p-8 text-gray-700 w-full max-w-md mt-12 mx-auto">
        <h2 className="text-2xl my-4 font-bold text-gray-800 text-center">登録</h2>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <p className="text-left">メールアドレス</p>
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded w-3/5"
          />
          <p className="text-left">パスワード</p>
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded w-3/5"
          />
          <p className="text-left">パスワード確認</p>
          <input
            type="password"
            placeholder="パスワード確認"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded w-3/5"
          />
          <button type="submit" className="bg-blue-500 text-white my-4 px-4 py-2 rounded w-2/5">登録</button>
        </form>
      </div>
    </div>
  );
}