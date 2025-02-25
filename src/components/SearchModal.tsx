import React, { useState } from 'react';

interface SearchModalProps {
  isModalOpen: boolean;
  searchQuery: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleModalToggle: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({
  isModalOpen,
  searchQuery,
  handleSearchChange,
  handleModalToggle,
}) => {
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const handleSearch = async () => {
    // ここで検索処理を行います。以下はダミーの検索結果です。
    const results = ['結果1', '結果2', '結果3'];
    setSearchResults(results);
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out">
      <div className="relative bg-gray-100 p-8 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out w-3/4 max-w-2xl">
        <button onClick={handleModalToggle} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl">
          &times;
        </button>
        <h2 className="text-2xl mb-4 text-gray-700">検索モーダル</h2>
        <input
          type="text"
          placeholder="検索"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-2 border rounded mb-4 text-gray-700"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 mx-auto block rounded mb-4 transforms transition-transform duration-300 ease-in-out hover:bg-blue-700 hover:text-white hover:scale-105 hover:shadow-lg">
          検索
        </button>
        <div>
          {searchResults.length > 0 ? (
            <ul>
              {searchResults.map((result, index) => (
                <li key={index} className="p-2 border-b border-gray-300">
                  {result}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700">検索結果がありません。</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;