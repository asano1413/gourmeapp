import { signOut, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import FlyoutMenu from './FlyoutMenu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import useSWR, { mutate } from 'swr';
import NotificationsModal from './Notifications';
import { APINotificationsResponse } from '@/pages/api/notifications';

export default function Header() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const { data: notifications } = useSWR<APINotificationsResponse>('/api/notifications');

  const buttonClassName = 'bg-white text-sky-700 rounded-b-xl border-l-2 border-r-2 border-b-2 border-sky-300 hover:bg-sky-300 hover:text-white p-4 hover:shadow-cyan-500/50 transition-colors duration-500 ease-in-out';
  const buttonActiveClassName = 'bg-sky-400 border-sky-400 text-white';

  return (
    <>
      <header className="flex justify-between items-center p-4 bg-gradient-to-r from-white to-cyan-100 fixed top-0 left-0 right-0 z-50">
        <div>
          <Link href="/" className="text-sky-700 text-2xl no-underline font-black ml-6 px-4 hover:text-[26px] duration-300 ease-in-out font-family-Arial">GourmeApp</Link>
        </div>
        <div className="flex items-center space-x-5">
          {status === "loading" ? (
            <span className='text-sm text-gray-500'>
              読み込み中…
            </span>
          ) : session ? (
            <>
              <button onClick={() => signOut()} className="text-white relative border-none bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 bg-[length:200%_100%] hover:bg-[position:100%_0] duration-500 ease-in-out px-5 py-3 rounded-xl">ログアウト</button>
              <button onClick={() => setNotificationOpen(!isNotificationOpen)} className="relative text-white border-none bg-gradient-to-r from-sky-300 via-sky-400 to-sky-500 bg-[length:200%_100%] hover:bg-[position:100%_0] duration-500 ease-in-out px-5 py-3 rounded-xl">
                通知
                {notifications && notifications?.unreadCount > 0 && (
                  <span className="absolute top-0 right-0 inline-block w-3 h-3 bg-red-500 rounded-full"></span>
                )}
              </button>
            </>
          ) : (
            <Link href="/auth/login" className="text-white relative border-none bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 bg-[length:200%_100%] hover:bg-[position:100%_0] duration-500 ease-in-out px-5 py-3 rounded-xl">ログイン</Link>
          )}
          <FlyoutMenu />
        </div>
      </header>

      {session && notifications && (
        <NotificationsModal
          isOpen={isNotificationOpen}
          onClose={() => setNotificationOpen(false)}
        />
      )}

      <div className="pt-16 bg-gray-100">
        <div className="p-2 top-16 left-0 right-0 z-40">
          <div className="flex justify-start ml-20 gap-5">
            <Link href='/' className={clsx(buttonClassName, pathname === '/' && buttonActiveClassName)}>飲食店シェア</Link>
            <Link href='/profile' className={clsx(buttonClassName, pathname === '/profile' && buttonActiveClassName)}>マイページ</Link>
            <Link href='#' className={clsx(buttonClassName, pathname === '#' && buttonActiveClassName)}>お知らせ</Link>
            <Link href="/dataInput" className={clsx(buttonClassName, pathname === '/dataInput' && buttonActiveClassName)}>店舗シェア</Link>
            <Link href='/contact' className={clsx(buttonClassName, pathname === '/contact' && buttonActiveClassName)}>お問い合わせ</Link>
          </div >
        </div >
      </div >
    </>
  );
}
