import React, { useState, useEffect } from 'react';
import FollowersModal from '../FollowsModal';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const FlyoutMenu = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [followers, setFollowers] = useState<string[]>([]);
  const [theme, setTheme] = useState('light');

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
  const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const toggleTheme = (theme: string) => {
    setTheme(theme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  };

  useEffect(() => {
    document.documentElement.classList.add(theme);
  }, [theme]);

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
            <Link href="/contact" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              お問い合わせ
            </Link>
          </li>
          <li className="border-b border-gray-200">
            <button
              onClick={toggleProfile}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none duration-300 ease-in-out"
            >
              マイページ
            </button>
            {isProfileOpen && (
              <div className="relative px-4 py-2 bg-gray-100">
                <img src="/images/icons8-acc_icon1.png" alt="icon" className="mt-4" />
                <p className='text-blue-500 mt-4'>ユーザー名</p>
                <p className='ml-2 text-gray-700'>アカウント名</p>
                <p className='text-blue-500 mt-2'>メール</p>
                <p className='text-gray-500 ml-2'>{session?.user?.email}</p>
                <p className='text-blue-500 mt-2'>フォロー中</p>
                <p
                  className='text-gray-500 ml-2 cursor-pointer hover:underline'
                  onClick={toggleModal}
                >
                  {followers.length}人
                </p>
                <button
                  onClick={toggleProfile}
                  className="mt-4 bg-red-300 text-white px-2 py-1 rounded focus:outline-none hover:bg-red-500 duration-500 ease-in-out"
                >
                  ✖
                </button>
              </div>
            )}
          </li>
          <li className="border-b border-gray-200">
            <button
              onClick={toggleSettings}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none duration-300 ease-in-out"
            >
              設定
            </button>
            {isSettingsOpen && (
              <div className="relative px-4 py-2 bg-gray-100">
                <div className="border border-gray-300 rounded mb-2">
                  <button
                    onClick={() => toggleTheme('light')}
                    className="w-full rounded text-left px-4 py-2 text-gray-700 hover:bg-gray-200 focus:outline-none"
                  >
                    ライトテーマ
                  </button>
                  <button
                    onClick={() => toggleTheme('dark')}
                    className="w-full rounded text-left px-4 py-2 bg-gray-500 text-gray-700 hover:bg-gray-700 hover:text-white focus:outline-none duration-300 ease-in-out"
                  >
                    ダークテーマ
                  </button>
                </div>
                <Link href="/settings" passHref legacyBehavior>
                  <a className="block px-4 py-2 text-gray-700 hover:bg-gray-200">詳細設定</a>
                </Link>
                <button
                  onClick={toggleSettings}
                  className="mt-4 bg-red-300 rounded text-white px-2 py-1 rounded focus:outline-none hover:bg-red-500 duration-500 ease-in-out"
                >
                  ✖
                </button>
              </div>
            )}
          </li>
        </ul>
      </div>
      <FollowersModal isOpen={isModalOpen} onClose={toggleModal} followers={followers} />
    </div>
  );
};

export default FlyoutMenu;
