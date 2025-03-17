import React, { useState, useEffect, useCallback } from 'react';
import SearchModal from '../components/SearchModal';
import { GoogleMap, LoadScript, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useRouter } from 'next/router';
import AppLayout from '@/components/AppLayout';

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
  const { isLoaded: isLoadedGoogleMap } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyAqN4yFqdVZKX8SNiCHZmAs1O6ZXmzwt1A',
  })

  const onLoad = useCallback((map: google.maps.Map) => {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(bounds)

    setMap(map);
  }, [])

  const onUnmount = React.useCallback((map: google.maps.Map) => {
    setMap(null);
  }, [])

  useEffect(() => {
    // ダミーデータとしてローカルストレージから取得（本来はAPIから取得）
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

  if (!isLoadedGoogleMap) {
    return (
      <AppLayout>
        <p>地図を読み込んでいます...</p>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="relative mt-20">
        <div className="flex justify-center space-x-4 mb-4">
          <button
            onClick={handleToggleView}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-400 transition"
          >
            {isMapView ? '検索結果を表示' : '地図を表示'}
          </button>
        </div>

        {isMapView ? (
          // <LoadScript googleMapsApiKey="AIzaSyAqN4yFqdVZKX8SNiCHZmAs1O6ZXmzwt1A">
          <div className="relative w-[80%] h-[500px] mx-auto">
            <GoogleMap
              onLoad={onLoad}
              onUnmount={onUnmount}
              mapContainerStyle={{ width: '100%', height: '100%' }}
              center={center}
              zoom={12}
            >
              {filteredRestaurants.map((restaurant, index) => (
                <Marker
                  key={index}
                  position={{ lat: restaurant.lat, lng: restaurant.lng }}
                  onClick={() => handleMarkerClick(restaurant)}
                />
              ))}
            </GoogleMap>
          </div>
          // </LoadScript>
        ) : (
          <div className="w-[80%] mx-auto">
            <h2 className="text-xl font-semibold mb-4">検索結果</h2>
            <ul className="space-y-4">
              {filteredRestaurants.length > 0 ? (
                filteredRestaurants.map((restaurant, index) => (
                  <li key={index} className="p-4 border rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-blue-500">{restaurant.name}</h3>
                    <p><strong>住所:</strong> {restaurant.address}</p>
                    <p><strong>ジャンル:</strong> {restaurant.category}</p>
                    <p><strong>営業時間:</strong> {restaurant.openingHours}</p>
                    <p><strong>評価:</strong> {restaurant.rating}</p>
                    {restaurant.image && <img src={restaurant.image} alt={restaurant.name} className="w-full h-auto mt-2" />}
                  </li>
                ))
              ) : (
                <p>検索結果がありません。</p>
              )}
            </ul>
          </div>
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
