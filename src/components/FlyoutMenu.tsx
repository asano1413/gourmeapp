import React, { useState } from 'react';

const FlyoutMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleMenu}
        className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none"
      >
        メニュー
      </button>
      <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transition-transform duration-500 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button
          onClick={toggleMenu}
          className="absolute left-0 top-0 h-full w-2 bg-red-500 text-white focus:outline-none"
        >
          &times;
        </button>
        <ul className="h-full overflow-y-auto">
          <li className="border-b border-gray-200">
            <a href="/contact" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              お問い合わせ
            </a>
          </li>
          <li className="border-b border-gray-200">
            <a href="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              設定
            </a>
          </li>
          <li>
            <a href="/api/user/Profile.tsx" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              マイページ
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FlyoutMenu;