import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Footer from '@/components/Footer';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const { data: session } = useSession();
    const [isNotificationOpen, setNotificationOpen] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);

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
            router.push('/');
        }
    };

    return (
        <div>
            <div>
                <header className="flex justify-between items-center p-4 bg-gray-200 fixed top-0 left-0 right-0 z-50">
                    <div>
                        <a href="/" className="text-black text-2xl no-underline">GourmeApp</a>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button onClick={() => setNotificationOpen(!isNotificationOpen)} className="bg-gray-400 text-black px-4 py-2 rounded">通知</button>
                        {isNotificationOpen && (
                            <div className="absolute right-4 top-12 bg-gray-100 text-gray-800 border border-gray-300 p-4">
                                <p>新たな通知はありません</p>
                            </div>
                        )}
                        <button onClick={() => setMenuOpen(!isMenuOpen)} className="bg-gray-400 text-black px-4 py-2 rounded">メニュー</button>
                        {isMenuOpen && (
                            <div className="absolute right-4 top-12 bg-gray-100 text-gray-800 border border-gray-200 p-5">
                                <a href="/profile" className="block m-2 p-4 border border-gray-300">プロフィール</a>
                                <a href="/settings" className="block m-2 p-4 border-gray-300">設定</a>
                            </div>
                        )}
                    </div>
                </header>
            </div>
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="bg-white shadow-md rounded p-8 text-gray-700 w-full max-w-md mt-12 mx-auto">
                    <h2 className="text-2xl my-4 font-bold text-gray-800 text-center">ログイン</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col items-center">
                        <p className='text-left'>メールアドレス</p>
                        <input
                            type="username"
                            placeholder="メールアドレス"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mb-4 p-2 border border-gray-300 rounded w-3/5"
                        />
                        <p className='text-left'>パスワード</p>
                        <input
                            type="password"
                            placeholder="パスワード"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mb-4 p-2 border border-gray-300 rounded w-3/5"
                        />
                        <button type="submit" className="bg-blue-500 text-white my-4 px-4 py-2 rounded w-2/5">ログイン</button>
                    </form>
                    <p className="mt-4 text-center">
                        <a href="/auth/register" className="text-blue-500">アカウントの登録</a>
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
}