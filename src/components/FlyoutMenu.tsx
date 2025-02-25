import React, { useState } from 'react';

const FlyoutMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleMenu}
        className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none"
      >
        メニュー
      </button>
      <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transition-transform duration-500 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {isOpen && (
          <button
            onClick={closeMenu}
            className="absolute left-[-32px] top-0 h-full w-8 bg-gray-200 text-black border-r border-gray-300 focus:outline-none flex items-center justify-center"
          >
            &times;
          </button>
        )}
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