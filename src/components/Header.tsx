import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';

export default function Header() {
    const { data: session } = useSession();
    const [isNotificationOpen, setNotificationOpen] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);

    return (
        <div>
            {/* メインヘッダー */}
            <header className="flex justify-between items-center p-4 bg-gray-200 fixed top-0 left-0 right-0 z-50">
                <div>
                    <a href="/" className="text-black text-2xl no-underline">GourmeApp</a>
                </div>
                <div className="flex items-center space-x-4">
                    {session ? (
                        <>
                            <span>ようこそ{session.user?.email}!</span>
                            <button onClick={() => signOut()} className="bg-blue-200 text-black px-4 py-2 rounded">ログアウト</button>
                        </>
                    ) : (
                        <a href="/auth/login" className="bg-blue-200 text-black px-4 py-2 rounded">ログイン</a>
                    )}
                    <button onClick={() => setNotificationOpen(!isNotificationOpen)} className="bg-gray-400 text-black px-4 py-2 rounded">通知</button>
                    {isNotificationOpen && (
                        <div className="absolute right-4 top-12 bg-white border border-gray-300 p-4">
                            <p>新たな通知はありません</p>
                        </div>
                    )}
                    <button onClick={() => setMenuOpen(!isMenuOpen)} className="bg-gray-400 text-black px-4 py-2 rounded">メニュー</button>
                    {isMenuOpen && (
                        <div className="absolute right-4 top-12 bg-white border border-gray-300 p-4">
                            <a href="/profile" className="block">プロフィール</a>
                            <a href="/settings" className="block mt-2">設定</a>
                        </div>
                    )}
                </div>
            </header>

            {/* サブヘッダー */}
            <div className="pt-16">
                <div className="bg-gray-100 p-4 fixed top-16 left-0 right-0 z-40">
                    <div className="flex justify-between">
                        <a href='#'>コンテンツ１</a>
                        <a href='#'>コンテンツ２</a>
                    </div>
                </div>
            </div>
        </div>
    );
}