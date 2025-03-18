import React, { ReactNode } from 'react';
import useSWR from 'swr';
import { APINotificationsResponse } from '@/pages/api/notifications';
import { Notification } from '@prisma/client';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationsModal = ({ isOpen, onClose }: NotificationsModalProps) => {
  const { data, error, mutate, isLoading } = useSWR<APINotificationsResponse>('/api/notifications');

  const notifications: Notification[] = data?.notifications ?? [];

  if (!isOpen) {
    return null;
  };

  if (error) {
    return (
      <NotificationsModalLayout onClose={onClose}>
        <div className="my-10 text-center text-red-500">エラーが発生しました</div>
      </NotificationsModalLayout>
    );
  }

  if (isLoading) {
    return (
      <NotificationsModalLayout onClose={onClose}>
        <div className="my-10 text-center text-gray-500">通知を読み込み中...</div>
      </NotificationsModalLayout>
    );
  }

  async function markAsRead(id: number) {
    const res = await fetch(`/api/notifications/${id}`, { method: 'DELETE' });
    if (res.ok) {
      mutate();
    } else {
      alert('通知の既読化に失敗しました');
    }
  }

  return (
    <NotificationsModalLayout onClose={onClose}>
      {notifications?.length > 0 ? (
        <ul>
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={`mb-2 p-2 border rounded ${notification.isRead ? "bg-gray-200" : "bg-white"
                } shadow-sm flex justify-between items-center`}
            >
              <span>{notification.message}</span>
              {!notification.isRead && (
                <button
                  onClick={() => markAsRead(notification.id)}
                  className="bg-green-300 text-white px-2 py-1 rounded focus:outline-none hover:bg-green-500"
                >
                  ✓
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>新たな通知はありません</p>
      )}
    </NotificationsModalLayout>
  )
}

type NotificationsModalLayoutProps = {
  children: ReactNode;
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
}
function NotificationsModalLayout({ children, onClose }: NotificationsModalLayoutProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-50 p-8 rounded-lg shadow-lg relative w-2/3 max-w-2xl">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-300 text-white sizes-[36px] rounded-full flex justify-center items-center focus:outline-none hover:bg-red-500 hover:rotate-90 duration-300 ease-in-out"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 -960 960 960" fill="#e3e3e3"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
          {/* ✖ */}
        </button>
        <h2 className="text-xl text-center font-bold mb-4">通知</h2>

        {children}
      </div>
    </div>
  );
}

export default NotificationsModal;
