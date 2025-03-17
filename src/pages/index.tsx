import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { useRouter } from 'next/router';
import AppLayout from '@/components/AppLayout';
import SearchResults from '@/components/SearchResults';

const center = {
  lat: 35.682839,
  lng: 139.759455,
};

interface Restaurant {
  lat: number;
  lng: number;
  name: string;
  address: string;
  category: string;
  openingHours: string;
  rating: number;
  image: string;
}

export default function MapComponent() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMapView, setIsMapView] = useState(true);
  const router = useRouter();
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback((map: google.maps.Map) => {
    setMap(null);
  }, []);

  useEffect(() => {
    const storedRestaurants = JSON.parse(localStorage.getItem('restaurants') || '[]');
    setRestaurants(storedRestaurants);
  }, []);

  const handleModalToggle = () => setModalOpen(!isModalOpen);
  const handleDataInputRedirect = () => router.push('/dataInput');
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value);
  const handleToggleView = () => setIsMapView(!isMapView);

  const normalizeString = (str: string) => str.normalize('NFKC').toLowerCase();
  const filteredRestaurants = restaurants.filter((restaurant) =>
    normalizeString(restaurant.name).includes(normalizeString(searchQuery))
  );

  const handleMarkerClick = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setModalOpen(true);
  };

  return (
    <AppLayout>
      <div className="relative bg-gray-100 p-4">
        <div className="flex justify-center mt-6 mb-4">
          <button
            onClick={() => setIsMapView(true)}
            className={`relative overflow-hidden px-5 py-3 rounded-xl rounded-r-none shadow-md transition group border-2 border-blue-700 border-r-0 ${isMapView ? 'bg-sky-500 text-white hover:bg-sky-400' : 'bg-white text-sky-500 hover:bg-sky-100'}`}
          >
            <span className="absolute inset-0 bg-sky-100 scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></span>
            <span className="relative z-10">地図を表示</span>
          </button>
          <button
            onClick={() => setIsMapView(false)}
            className={`relative overflow-hidden px-5 py-3 rounded-xl rounded-l-none shadow-md transition group border-2 border-blue-700 border-l-0 ${!isMapView ? 'bg-sky-500 text-white hover:bg-sky-400' : 'bg-white text-sky-500 hover:bg-sky-100'}`}
          >
            <span className="absolute inset-0 bg-sky-100 scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></span>
            <span className="relative z-10">検索結果を表示</span>
          </button>
        </div>

        {isMapView ? (
          <div className="relative w-[80%] h-[500px] mx-auto">
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%' }}
              center={center}
              zoom={15.0}
              onLoad={onLoad}
              onUnmount={onUnmount}
            >
              {restaurants.map((restaurant, index) => (
                <Marker
                  key={index}
                  position={{ lat: restaurant.lat, lng: restaurant.lng }}
                  onClick={() => handleMarkerClick(restaurant)}
                />
              ))}
            </GoogleMap>
            <button
              onClick={handleDataInputRedirect}
              className="fixed bottom-6 right-6 bg-blue-500 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-600"
            >
              データを追加
            </button>
          </div>
        ) : (
          <SearchResults results={filteredRestaurants} onSearch={setSearchQuery} />
        )}

        {selectedRestaurant && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
              <h2 className="text-2xl font-semibold mb-4 text-blue-500 text-center">{selectedRestaurant.name}</h2>
              <p><strong>住所:</strong> {selectedRestaurant.address}</p>
              <p><strong>ジャンル:</strong> {selectedRestaurant.category}</p>
              <p><strong>営業時間:</strong> {selectedRestaurant.openingHours}</p>
              <p><strong>評価:</strong> {selectedRestaurant.rating}</p>
              {selectedRestaurant.image && <img src={selectedRestaurant.image} alt={selectedRestaurant.name} className="w-full h-auto mb-4" />}
              <button onClick={() => setSelectedRestaurant(null)} className="bg-red-500 text-white px-4 py-2 rounded">
                閉じる
              </button>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
