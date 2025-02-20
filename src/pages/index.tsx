import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useRouter } from "next/router";

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
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    // ダミーデータとしてローカルストレージから取得（本来はAPIから取得）
    const storedRestaurants = JSON.parse(localStorage.getItem("restaurants") || "[]");
    setRestaurants(storedRestaurants);
  }, []);

  const handleModalToggle = () => {
    setModalOpen(!isModalOpen);
  };

  const handleDataInputRedirect = () => {
    router.push("/dataInput");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const normalizeString = (str: string) => {
    return str.normalize("NFKC").toLowerCase();
  };

  const filteredRestaurants = restaurants.filter((restaurant) =>
    normalizeString(restaurant.name).includes(normalizeString(searchQuery))
  );

  const handleMarkerClick = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setModalOpen(true);
  };

  return (
    <div className="w-full h-full bg-gray-50">
      <Header />
      <div className="relative mt-20">
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
          <div className="relative w-[80%] h-[500px] mx-auto">
            <GoogleMap mapContainerStyle={{ width: "100%", height: "100%" }} center={center} zoom={12}>
              {filteredRestaurants.map((restaurant, index) => (
                <Marker
                  key={index}
                  position={{ lat: restaurant.lat, lng: restaurant.lng }}
                  onClick={() => handleMarkerClick(restaurant)}
                />
              ))}
            </GoogleMap>
            <div className="absolute top-2 left-2 right-2">
              <button
                onClick={handleModalToggle}
                className="absolute top-4 left-4 bg-blue-500 text-white rounded-full p-4 shadow-lg z-10"
              >
                検索
              </button>
              <button
                onClick={handleDataInputRedirect}
                className="absolute top-4 left-20 bg-green-500 text-white rounded-full p-4 shadow-lg z-10"
              >
                データ入力
              </button>
              {isModalOpen && (
                <div className="absolute top-20 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-20 transition-opacity duration-300 ease-in-out">
                  <div className="bg-white p-8 rounded shadow-lg transform transition-transform duration-300 ease-in-out">
                    <h2 className="text-2xl mb-4">検索モーダル</h2>
                    <input
                      type="text"
                      placeholder="検索"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="w-full p-2 border rounded mb-4"
                    />
                    <button onClick={handleModalToggle} className="bg-red-500 text-white px-4 py-2 rounded">
                      閉じる
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </LoadScript>
      </div>
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
      <Footer />
    </div>
  );
}