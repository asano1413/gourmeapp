import { useState } from 'react';

export default function Register() {
    const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const [isNotificationOpen, setNotificationOpen] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            setError('パスワードが一致しません');
            return;
        }

        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });

        const data = await res.json();
        if (res.ok) {
            alert('登録が成功しました！');
        } else {
            alert(data.error);
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
                        <p>メールアドレス</p>
                        <input
                            type="email"
                            name="email"
                            placeholder="メールアドレス"
                            value={form.email}
                            onChange={handleChange}
                            className="mb-4 p-2 border border-gray-300 rounded w-3/5"
                        />
                        <p>パスワード</p>
                        <input
                            type="password"
                            name="password"
                            placeholder="パスワード"
                            value={form.password}
                            onChange={handleChange}
                            className="mb-4 p-2 border border-gray-300 rounded w-3/5"
                        />
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
        </div>
    );
}