import React, { useState } from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';

const FlyoutMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
      >
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
          <FaUser className="text-gray-600" />
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          <Link
            href="/profile"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <FaUser className="mr-3" />
            プロフィール
          </Link>
          <Link
            href="/settings"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <FaCog className="mr-3" />
            設定
          </Link>
          <button
            onClick={handleSignOut}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <FaSignOutAlt className="mr-3" />
            ログアウト
          </button>
        </div>
      )}
    </div>
  );
};

export default FlyoutMenu;
