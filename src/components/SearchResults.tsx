import { type ApiSearchResponse } from '@/app/api/search/route';
import React, { useEffect, useState } from 'react';
import StoreDetails from './StoreDetails';

const SearchResults: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResponse, setSearchResponse] = useState<ApiSearchResponse>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSearchResults();
  }, []);

  const itemsPerPage = 10;

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const fetchSearchResults = async () => {
    const response = await fetch(`/api/search?q=${searchQuery}`);
    const data = await response.json();

    setSearchResponse(data);
    setIsLoading(false);
    console.log(data);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    fetchSearchResults();
  };

  if (isLoading || !searchResponse?.results) {
    return <div className="container mx-auto p-10 flex items-center justify-center">Loading...</div>;
  }

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
      {!searchResponse || searchResponse.results?.length === 0 ? (
        <div className="flex items-center justify-center mt-14">
          <div className="text-center bg-sky-100 px-16 py-10 rounded-[50px] shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4">検索結果が見つかりませんでした</h2>
            <p className="text-gray-700">別のキーワードで検索してみてください。</p>
          </div>
        </div>
      ) : (
        <>
          {searchResponse.results?.map((store) => (
            <StoreDetails key={store.id} store={store} reviews={store.reviews} />
          ))}

          {searchResponse.results.length > itemsPerPage && (
            <Pagination currentPage={currentPage} totalPages={Math.ceil(searchResponse.results.length / itemsPerPage)} onPageChange={handleClick} />
          )}
        </>
      )}
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }: { currentPage: number; totalPages: number; onPageChange: (page: number) => void }) => {
  return (
    <div className="flex justify-center mt-4">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}

export default SearchResults;
