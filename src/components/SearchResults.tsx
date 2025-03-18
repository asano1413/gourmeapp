import React, { useState } from 'react';

interface Review {
  id: number;
  content: string;
  rating: number;
  reviewCount: number;
}

interface Store {
  id: number;
  name: string;
  genre: string;
  rating: number;
  hours: string;
  image?: string;
  reviews: Review[];
}

interface SearchResultsProps {
  results?: Store[]; // `results`をオプショナルに変更
  onSearch: (query: string) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results = [], onSearch }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 10;

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const paginatedResults = results.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <form onSubmit={handleSearch} className="mb-6 flex items-center w-full justify-center">
        <input
          type="text"
          placeholder="検索キーワード"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-sky-700 rounded-xl w-full md:w-2/5 mb-4"
        />
        <button type="submit" className="relative bg-sky-500 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:bg-sky-400 ml-2 mb-4">
          検索
        </button>
      </form>
      {!results || results.length === 0 ? (
        <div className="flex items-center justify-center mt-14">
          <div className="text-center bg-sky-100 px-16 py-10 rounded-[50px] shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4">検索結果が見つかりませんでした</h2>
            <p className="text-gray-700">別のキーワードで検索してみてください。</p>
          </div>
        </div>
      ) : (
        <>
          {paginatedResults.map((store) => (
            <div key={store.id} className="mb-6 p-4 border rounded shadow-md w-full max-w-2xl">
              <h2 className="text-xl font-bold mb-2">{store.name}</h2>
              <p className="text-gray-700 mb-1"><strong>ジャンル:</strong> {store.genre}</p>
              <p className="text-gray-700 mb-1"><strong>星の数:</strong> {store.rating}</p>
              <p className="text-gray-700 mb-1"><strong>営業時間:</strong> {store.hours}</p>
              {store.image && <img src={store.image} alt={store.name} className="mb-2 w-full h-auto" />}
              {store.reviews?.length > 0 && (
                <div className="mt-2 p-2 bg-gray-100 rounded">
                  <h3 className="text-lg font-semibold mb-1">レビュー</h3>
                  <p className="text-gray-700">{store.reviews[0].content}</p>
                  <p className="text-gray-500 text-sm">評価数: {store.reviews[0].reviewCount}</p>
                </div>
              )}
            </div>
          ))}
          <div className="flex justify-center mt-4">
            {Array.from({ length: Math.ceil(results.length / itemsPerPage) }, (_, index) => (
              <button
                key={index}
                onClick={() => handleClick(index + 1)}
                className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchResults;
