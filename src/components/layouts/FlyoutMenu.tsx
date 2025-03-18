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
    <div className="relative">
      {/* ハンバーガーボタン */}
      <button
        onClick={toggleMenu}
        className="bg-gray-700 text-white font-bold text-2xl border-2 border-gray-700 px-3 py-2 rounded-2xl focus:outline-none hover:bg-white hover:text-gray-700 hover:rotate-180 duration-500 ease-in-out"
      >
        ≡
      </button>

      {/* フライアウトメニュー */}
      <div className={`fixed top-0 right-0 w-[250px] h-full bg-gradient-to-b from-gray-200 to-gray-50 shadow-lg transition-transform duration-500 ease-in-out transform ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}>
        {/* ヘッダー（✖ボタンを内包） */}
        <div className="flex justify-between items-center p-4 border-b border-blue-600">
          <h2 className="text-xl ml-4 font-semibold text-gray-700">メニュー</h2>
          <button
            onClick={closeMenu}
            className="text-3xl text-gray-700 focus:outline-none"
          >
            &times;
          </button>
        </div>

        {/* メニュー項目 */}
        <ul className="mt-4 px-6">
          <li className="border-b border-blue-500 py-4">
            <Link href="/contact" className="text-left font-bold text-gray-700 p-2 relative inline-block no-underline outline-none
              after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5
              after:bg-gray-500 after:transition-all after:duration-500
              after:origin-right after:scale-x-0
              hover:after:w-full hover:after:scale-x-100 hover:after:origin-left">
              お問い合わせ
            </Link>
          </li>

          {/* マイページ */}
          <li className="border-b border-blue-500 py-4">
            <button onClick={toggleProfile} className="text-left font-bold text-gray-700 p-2 relative inline-block no-underline outline-none
              after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5
              after:bg-gray-500 after:transition-all after:duration-500
              after:origin-right after:scale-x-0
              hover:after:w-full hover:after:scale-x-100 hover:after:origin-left">
              マイページ
            </button>
            {isProfileOpen && (
              <div className="mt-2 p-4 bg-white rounded-lg shadow items-center">
                <img src="/images/icons8-acc_icon1.png" alt="icon" className="mt-4 mr-4" />
                <div>
                  <p className='text-blue-500 mt-2'>{session?.user?.name}</p>
                  <p className="text-gray-500 ml-2">{session?.user?.email}</p>
                  <p className="text-blue-500 mt-2">フォロー中</p>
                  <p className="text-gray-500 ml-2 cursor-pointer hover:underline" onClick={toggleModal}>
                    {followers.length}人
                  </p>
                </div>
                <div className="flex justify-end">
                  <button onClick={toggleProfile} className="mt-4 ml-28 bg-red-400 text-white px-3 py-1 rounded hover:bg-red-500 duration-500 ease-in-out">
                    ✖
                  </button>
                </div>
              </div>
            )}
          </li>

          {/* 設定 */}
          <li className="border-b border-blue-500 py-4">
            <button onClick={toggleSettings} className="text-left font-bold text-gray-700 p-2 relative inline-block no-underline outline-none
              after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5
              after:bg-gray-500 after:transition-all after:duration-500
              after:origin-right after:scale-x-0
              hover:after:w-full hover:after:scale-x-100 hover:after:origin-left">
              設定
            </button>
            {isSettingsOpen && (
              <div className="mt-2 p-4 bg-white rounded-lg shadow">
                <div className="border border-gray-300 rounded mb-2">
                  <button onClick={() => toggleTheme('light')} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200">
                    ライトテーマ
                  </button>
                  <button onClick={() => toggleTheme('dark')} className="w-full text-left px-4 py-2 bg-gray-500 text-white hover:bg-gray-700">
                    ダークテーマ
                  </button>
                </div>
                <Link href="/settings" passHref legacyBehavior>
                  <a className="text-left font-bold text-gray-700 p-2 relative inline-block no-underline outline-none
                    after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5
                    after:bg-gray-500 after:transition-all after:duration-500
                    after:origin-right after:scale-x-0
                    hover:after:w-full hover:after:scale-x-100 hover:after:origin-left">詳細設定</a>
                </Link>
                <div className="flex justify-end">
                  <button onClick={toggleSettings} className="mt-4 bg-red-300 text-white px-3 py-1 rounded hover:bg-red-500 duration-500 ease-in-out">
                    ✖
                  </button>
                </div>
              </div>
            )}
          </li>
        </ul>
      </div>

      {/* フォロワーのモーダル */}
      <FollowersModal isOpen={isModalOpen} onClose={toggleModal} followers={followers} />
    </div>
  );
};

export default FlyoutMenu;
