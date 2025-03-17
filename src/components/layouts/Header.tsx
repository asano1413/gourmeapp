import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import FlyoutMenu from './FlyoutMenu';
import Link from 'next/link';
import NotificationModal from '../NotificationModalProps';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

interface Notification {
  id: number;
  message: string;
  isRead: boolean;
}

export default function Header() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, message: '通知1', isRead: false },
    { id: 2, message: '通知2', isRead: false },
    { id: 3, message: '通知3', isRead: false },
  ]);

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, isRead: true } : notification
    ));
  };

  const buttonClassName = 'text-blue-700 rounded-b-xl border-l-2 border-r-2 border-b-2 border-blue-500 hover:bg-blue-500 hover:text-white p-4 transition-colors duration-500 ease-in-out';
  const buttonActiveClassName = 'bg-blue-500 text-white';

  return (
    <>
      {/* メインヘッダー */}
      <header className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-100 to-gray-400 fixed top-0 left-0 right-0 z-50">
        <div>
          <Link href="/" className="text-black text-2xl no-underline font-black ml-6 px-4 hover:text-blue-700 duration-300 ease-in-out">GourmeApp</Link>
        </div>
        <div className="flex items-center space-x-5">
          {status === "loading" ? (
            <span className='text-sm text-gray-500'>
              読み込み中…
            </span>
          ) : session ? (
            <>
              <button onClick={() => signOut()} className="text-white relative border-none bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 bg-[length:200%_100%] hover:bg-[position:100%_0] duration-500 ease-in-out px-5 py-3 rounded-xl">ログアウト</button>
            </>
          ) : (
            <Link href="/auth/login" className="text-white relative border-none bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 bg-[length:200%_100%] hover:bg-[position:100%_0] duration-500 ease-in-out px-5 py-3 rounded-xl">ログイン</Link>
          )}
          <button onClick={() => setNotificationOpen(!isNotificationOpen)} className="text-white relative border-none bg-gradient-to-r from-gray-500 via-gray-600 to-gray-800 bg-[length:200%_100%] hover:bg-[position:100%_0] duration-500 ease-in-out px-4 py-2 rounded-xl">通知</button>
          <FlyoutMenu />
        </div>
      </header>

      <NotificationModal
        isOpen={isNotificationOpen}
        onClose={() => setNotificationOpen(false)}
        notifications={notifications}
        markAsRead={markAsRead}
      />

      {/* サブヘッダー */}
      <div className="pt-16">
        <div className="p-2 top-16 left-0 right-0 z-40">
          <div className="flex justify-start ml-20 gap-5">
            <Link href='/' className={clsx(buttonClassName, pathname === '/' && buttonActiveClassName)}>飲食店シェア</Link>
            <Link href='/profile' className={clsx(buttonClassName, pathname === '/profile' && buttonActiveClassName)}>マイページ</Link>
            <Link href='#' className={clsx(buttonClassName, pathname === '#' && buttonActiveClassName)}>お知らせ</Link>
            <Link href="/dataInput" className={clsx(buttonClassName, pathname === '/dataInput' && buttonActiveClassName)}>店舗登録</Link>
          </div >
        </div >
      </div >
    </>
  );
}
