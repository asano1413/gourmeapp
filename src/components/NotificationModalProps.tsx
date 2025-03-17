import React from 'react';

interface Notification {
  id: number;
  message: string;
  isRead: boolean;
}

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  markAsRead: (id: number) => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onClose, notifications, markAsRead }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-50 p-8 rounded-lg shadow-lg relative w-2/3 max-w-2xl">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-300 text-white px-3 py-2 rounded-[35px] focus:outline-none hover:bg-red-500 hover:rotate-90 duration-300 ease-in-out"
        >
          ✖
        </button>
        <h2 className="text-xl text-center font-bold mb-4">通知</h2>
        {notifications.length > 0 ? (
          <ul>
            {notifications.map((notification) => (
              <li key={notification.id} className={`mb-2 p-2 border rounded ${notification.isRead ? 'bg-gray-200' : 'bg-white'} shadow-sm flex justify-between items-center`}>
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
      </div>
    </div>
  );
};

export default NotificationModal;
