import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import FlyoutMenu from './FlyoutMenu';
import Link from 'next/link';

export default function Header() {
  const { data: session } = useSession();
  const [isNotificationOpen, setNotificationOpen] = useState(false);

  return (
    <>
      {/* メインヘッダー */}
      <header className="flex justify-between items-center p-4 bg-gray-200 fixed top-0 left-0 right-0 z-50">
        <div>
          <Link href="/" className="text-black text-2xl no-underline font-bold ml-6 px-4">GourmeApp</Link>
        </div>
        <div className="flex items-center space-x-4">
          {session ? (
            <>
              <span>ようこそ{session.user?.email}!</span>
              <button onClick={() => signOut()} className="bg-blue-200 text-black px-4 py-2 rounded">ログアウト</button>
            </>
          ) : (
            <Link href="/auth/login" className="bg-blue-200 text-black px-4 py-2 rounded">ログイン</Link>
          )}
          <button onClick={() => setNotificationOpen(!isNotificationOpen)} className="bg-gray-400 text-black px-4 py-2 rounded">通知</button>
          {isNotificationOpen && (
            <div className="absolute right-4 top-12 bg-white border border-gray-300 p-4">
              <p>新たな通知はありません</p>
            </div>
          )}
          <FlyoutMenu />
        </div>
      </header>

      {/* サブヘッダー */}
      <div className="pt-16">
        <div className="bg-gray-100 p-2 fixed top-16 left-0 right-0 z-40">
          <div className="flex justify-start ml-20 gap-5">
            <Link href='/' className='text-blue-700 border-l-1 border-r-1 border-b-2 border-blue-300 hover:bg-blue-300 hover:text-white p-4 transition-colors duration-300'>飲食店シェア</Link>
            <a href='api/posts/Threads' className='text-blue-700 border-l-1 border-r-1 border-b-2 border-blue-300 hover:bg-blue-300 hover:text-white p-4 transition-colors duration-300'>口コミ共有</a>
          </div>
        </div>
      </div>
    </>
  );
}
