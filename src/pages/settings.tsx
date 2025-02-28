import React, { useState, useEffect } from "react";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

const Settings = () => {
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
  });

  const [currentProfile, setCurrentProfile] = useState({
    username: "current_user",
    email: "current@example.com",
    password: "current_password",
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleNotificationsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotifications({ ...notifications, [name]: checked });
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // プロフィール情報を更新するAPIを呼び出す
    console.log("プロフィール更新:", profile);
  };

  const handleNotificationsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 通知設定を更新するAPIを呼び出す
    console.log("通知設定更新:", notifications);
  };

  const useCurrentProfile = (field: string) => {
    setProfile({ ...profile, [field]: currentProfile[field as keyof typeof currentProfile] });
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4 w-3/5 mt-24">
        <h1 className="text-2xl font-bold mb-4">設定</h1>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">プロフィール情報</h2>
          <form onSubmit={handleProfileSubmit} className="bg-white p-4 rounded shadow-md">
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 font-bold mb-2">ユーザー名</label>
              <div className="flex">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={profile.username}
                  onChange={handleProfileChange}
                  className="w-full p-2 border rounded"
                  required
                />
                <button
                  type="button"
                  onClick={() => useCurrentProfile("username")}
                  className="ml-2 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                >
                  現在のユーザー名を使用
                </button>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">メールアドレス</label>
              <div className="flex">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  className="w-full p-2 border rounded"
                  required
                />
                <button
                  type="button"
                  onClick={() => useCurrentProfile("email")}
                  className="ml-2 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                >
                  現在のメールを使用
                </button>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-bold mb-2">パスワード</label>
              <div className="flex">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={profile.password}
                  onChange={handleProfileChange}
                  className="w-full p-2 border rounded"
                  required
                />
                <button
                  type="button"
                  onClick={() => useCurrentProfile("password")}
                  className="ml-2 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                >
                  現在のパスワードを使用
                </button>
              </div>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">更新</button>
          </form>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">通知設定</h2>
          <form onSubmit={handleNotificationsSubmit} className="bg-white p-4 rounded shadow-md">
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={notifications.emailNotifications}
                  onChange={handleNotificationsChange}
                  className="mr-2"
                />
                メール通知を受け取る
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                <input
                  type="checkbox"
                  name="smsNotifications"
                  checked={notifications.smsNotifications}
                  onChange={handleNotificationsChange}
                  className="mr-2"
                />
                SMS通知を受け取る
              </label>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">更新</button>
          </form>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">テーマ設定</h2>
          <div className="bg-white p-4 rounded shadow-md text-center">
            <button className="bg-blue-300 text-black px-4 py-2 rounded hover:bg-blue-400 mr-2">ライトテーマ</button>
            <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">ダークテーマ</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Settings;
