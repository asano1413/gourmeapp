import { useRouter } from 'next/router';
import { useState } from 'react';
import AppLayout from '@/components/AppLayout';

type ErrorsState = {
  username: string[] | null;
  email: string[] | null;
  password: string[] | null;
  confirmPassword: string[] | null;
}

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [formErrors, setFormErrors] = useState<ErrorsState>({ username: null, email: null, password: null, confirmPassword: null });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setFormErrors({ ...formErrors, confirmPassword: ['パスワードが一致しません'] });
      return;
    }

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok && res.status === 201) {
      alert('登録が成功しました！');
      router.push('/auth/login');
    } else {
      try {
        const data = await res.json();
        if (typeof data.errors === "object") {
          setFormErrors({
            username: data.errors.username ?? null,
            email: data.errors.email ?? null,
            password: data.errors.password ?? null,
            confirmPassword: data.errors.confirmPassword ?? null,
          });
        }
      } catch (error) {
        setError('登録に失敗しました');
      }
    }
  };

  return (
    <AppLayout>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 mt-16">
        <div className="bg-white shadow-md rounded p-8 text-gray-700 w-full max-w-md my-12 mx-auto">
          <h2 className="text-2xl my-4 font-bold text-gray-800 text-center">登録</h2>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <p>アカウント名</p>
            <input
              type="text"
              name="username"
              placeholder="アカウント名"
              value={form.username}
              onChange={handleChange}
              className="mb-4 p-2 border border-gray-300 rounded w-3/5"
            />
            {formErrors.username && <p className="text-red-500">{formErrors.username}</p>}

            <p>メールアドレス</p>
            <input
              type="email"
              name="email"
              placeholder="メールアドレス"
              value={form.email}
              onChange={handleChange}
              className="mb-4 p-2 border border-gray-300 rounded w-3/5"
            />
            {formErrors.email && <p className="text-red-500">{formErrors.email}</p>}

            <p>パスワード</p>
            <input
              type="password"
              name="password"
              placeholder="パスワード"
              value={form.password}
              onChange={handleChange}
              className="mb-4 p-2 border border-gray-300 rounded w-3/5"
            />
            {formErrors.password && <p className="text-red-500">{formErrors.password}</p>}

            <p>パスワード確認</p>
            <input
              type="password"
              name="confirmPassword"
              placeholder="パスワード確認"
              value={form.confirmPassword}
              onChange={handleChange}
              className="mb-4 p-2 border border-gray-300 rounded w-3/5"
            />
            {error && <p className="text-red-500">{error}</p>}
            <button type="submit" className="bg-blue-500 text-white my-4 px-4 py-2 rounded w-2/5">登録</button>
          </form>
          <p className="mt-4 text-center">
            <a href="/auth/login" className="text-blue-500">ログインページへ</a>
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
