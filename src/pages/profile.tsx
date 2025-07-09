import React from "react";
import { useSession } from "next-auth/react";
import AppLayout from '@/components/AppLayout';
import Link from 'next/link';

export default function Profile() {
  const { data: session } = useSession();
  const user = session?.user;

  if (!user) return <div>読み込み中...</div>;

  return (
    <AppLayout>
      <div className="flex flex-col items-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded p-8 text-gray-700 w-full max-w-md mt-12 mx-auto">
          <h2 className="text-2xl my-4 font-bold text-gray-800 text-center">プロフィール</h2>

          <div className="flex flex-col items-center">
            <p><strong>名前:</strong> {user.name}</p>
            <p><strong>メールアドレス:</strong> {user.email}</p>
            <Link href="/settings" className="bg-gray-800 border-2 border-gray-800 text-white my-4 px-4 py-2 rounded w-2/5 text-center hover:bg-white hover:text-gray-600 duration-500 ease-in-out">編集</Link>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
