import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import AppLayout from '@/components/AppLayout';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      alert('ログインに失敗しました');
    } else {
      setIsAnimating(true);
      setTimeout(() => {
        router.push('/');
      }, 1000);
    }
  };

  return (
    <AppLayout>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded p-8 text-gray-700 w-full max-w-md mt-12 mx-auto rounded-lg">
          <h2 className="text-2xl my-4 font-bold text-sky-600 text-center">ログイン</h2>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <p className='text-left'>メールアドレス</p>
            <input
              type="email"
              placeholder="メールアドレス"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4 p-2 border border-sky-300 rounded w-3/5"
            />
            <p className='text-left'>パスワード</p>
            <input
              type="password"
              placeholder="パスワード"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4 p-2 border border-sky-300 rounded w-3/5"
            />
            <button type="submit" className="bg-sky-500 text-white my-4 px-4 py-2 rounded w-2/5 hover:bg-sky-600 duration-500 ">ログイン</button>
          </form>
          <p className="mt-4 text-center">
            <a href="/auth/register" className="text-blue-500 hover:underline">アカウントの登録</a>
          </p>
        </div>
      </div>
      {isAnimating && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
        </div>
      )}
    </AppLayout>
  );
}
