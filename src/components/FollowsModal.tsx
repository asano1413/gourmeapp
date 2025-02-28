import React from 'react';

interface FollowersModalProps {
  isOpen: boolean;
  onClose: () => void;
  followers: string[];
}

const FollowersModal: React.FC<FollowersModalProps> = ({ isOpen, onClose, followers }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">フォロー中の人</h2>
        <ul>
          {followers.map((follower, index) => (
            <li key={index} className="mb-2">{follower}</li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-4 bg-red-300 text-white px-4 py-2 rounded focus:outline-none hover:bg-red-500 duration-500 ease-in-out"
        >
          閉じる
        </button>
      </div>
    </div>
  );
};

export default FollowersModal;
