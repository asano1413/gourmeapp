import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import FlyoutMenu from './FlyoutMenu';
import Link from 'next/link';
import NotificationModal from '../NotificationModalProps';

interface Notification {
  id: number;
  message: string;
  isRead: boolean;
}

export default function Header() {
  const { data: session } = useSession();
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

  return (
    <>
      {/* メインヘッダー */}
      <header className="flex justify-between items-center p-4 bg-gray-200 fixed top-0 left-0 right-0 z-50">
        <div>
          <Link href="/" className="text-black text-2xl no-underline font-bold ml-6 px-4 hover:text-blue-700 duration-300 ease-in-out">GourmeApp</Link>
        </div>
        <div className="flex items-center space-x-4">
          {session ? (
            <>
              <button onClick={() => signOut()} className="bg-blue-200 text-black px-4 py-2 rounded">ログアウト</button>
            </>
          ) : (
            <Link href="/auth/login" className="bg-blue-200 text-black px-4 py-2 rounded">ログイン</Link>
          )}
          <button onClick={() => setNotificationOpen(!isNotificationOpen)} className="bg-gray-400 text-black px-4 py-2 rounded">通知</button>
          <NotificationModal
            isOpen={isNotificationOpen}
            onClose={() => setNotificationOpen(false)}
            notifications={notifications}
            markAsRead={markAsRead}
          />
          <FlyoutMenu />
        </div>
      </header>

      {/* サブヘッダー */}
      <div className="pt-16">
        <div className="bg-gray-100 p-2 fixed top-16 left-0 right-0 z-40">
          <div className="flex justify-start ml-20 gap-5">
            <Link href='/' className='text-blue-700 rounded-b-xl border-l-2 border-r-2 border-b-2 border-blue-500 hover:bg-blue-500 hover:text-white p-4 transition-colors duration-300'>飲食店シェア</Link>
            <a href='api/posts/Threads' className='text-blue-700 rounded-b-xl border-l-2 border-r-2 border-b-2 border-blue-500 hover:bg-blue-500 hover:text-white p-4 transition-colors duration-300'>口コミ共有</a>
          </div>
        </div>
      </div>
    </>
  );
}
