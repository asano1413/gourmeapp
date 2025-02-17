import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useRouter } from "next/router";


const center = {
  lat: 35.682839,
  lng: 139.759455,
};

interface Restaurant {
  lat: number;
  lng: number;
}

export default function MapComponent() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
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

  return (
    <div className="w-full h-full bg-gray-50">
      <Header />
      <div className="relative mt-20">
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
          <div className="relative w-[80%] h-[500px] mx-auto">
          <GoogleMap mapContainerStyle={{ width: "100%", height: "100%" }} center={center} zoom={12}>
            {restaurants.map((restaurant, index) => (
              <Marker key={index} position={{ lat: restaurant.lat, lng: restaurant.lng }} />
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
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-20">
                <div className="bg-white p-8 rounded shadow-lg">
                  <h2 className="text-2xl mb-4">検索モーダル</h2>
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
    </div>
  );
}