import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

declare global {
  interface Window {
    google: any;
  }
}

export default function RestaurantForm() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    category: "",
    openingHours: "",
    lat: null,
    lng: null,
    rating: 0,
    image: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleRatingClick = (rating: number) => {
    setFormData({ ...formData, rating });
  };

  const fetchCoordinates = async (address: string) => {
    const apiKey = "YOUR_GOOGLE_MAPS_API_KEY";
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
    );
    const data = await response.json();
    if (data.results.length > 0) {
      const location = data.results[0].geometry.location;
      setFormData({ ...formData, lat: location.lat, lng: location.lng });
    }
  };

  useEffect(() => {
    if (formData.address) {
      fetchCoordinates(formData.address);
    }
  }, [formData.address]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`;
      script.async = true;
      script.onload = () => {
        if (typeof window.google !== "undefined") {
          const map = new window.google.maps.Map(document.getElementById("map") as HTMLElement, {
            center: { lat: 35.6895, lng: 139.6917 },
            zoom: 15,
          });

          const marker = new window.google.maps.Marker({
            position: { lat: 35.6895, lng: 139.6917 },
            map,
            draggable: true,
          });

          window.google.maps.event.addListener(marker, "dragend", async function () {
            const lat = marker.getPosition()?.lat();
            const lng = marker.getPosition()?.lng();
            if (lat && lng) {
              const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=YOUR_GOOGLE_MAPS_API_KEY`
              );
              const data = await response.json();
              if (data.results.length > 0) {
                const address = data.results[0].formatted_address;
                setFormData({ ...formData, address, lat, lng });
              }
            }
          });
        }
      };
      document.head.appendChild(script);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // ここでバックエンドにデータを送信する処理を追加
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-blue-500 text-center">飲食店を登録</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="店名"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="住所"
          value={formData.address}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="ジャンル (例: カフェ, ラーメン)"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <input
          type="text"
          name="openingHours"
          placeholder="営業時間 (例: 10:00 - 22:00)"
          value={formData.openingHours}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
        />
        <div className="flex mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={`cursor-pointer text-2xl ${star <= formData.rating ? "text-yellow-400" : "text-gray-300"}`}
              onClick={() => handleRatingClick(star)}
            />
          ))}
        </div>
        <input
          type="file"
          name="image"
          onChange={handleFileChange}
          className="w-full p-2 border rounded mb-2"
        />
        <div id="map" className="w-full h-64 mb-4"></div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          登録
        </button>
      </form>
    </div>
  );
}