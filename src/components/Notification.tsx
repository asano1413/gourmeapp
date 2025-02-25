import React from 'react';
import { useNotifications } from '../hooks/useNotification'; // 相対パスに修正

const NotificationComponent: React.FC = () => {
  const { notifications, isLoading, isError } = useNotifications();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading notifications</div>;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">通知</h2>
        <ul>
          {notifications.map((notification: { id: string; message: string }) => (
            <li key={notification.id} className="border-b border-gray-200 p-2">
              {notification.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NotificationComponent;