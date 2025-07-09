import React from "react";
import AppLayout from '@/components/AppLayout';

const SearchPage = () => {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">検索</h1>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 text-center">
              検索機能は現在開発中です。
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default SearchPage;
